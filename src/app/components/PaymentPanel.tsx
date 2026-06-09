"use client";

import { useState } from "react";
import { Wallet, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";
import type { Synapse } from "@filoz/synapse-sdk";
import { useFilecoinPay, fmtUSDFC } from "@/hooks/useFilecoinPay";

const BERYX_TX = "https://filecoin-testnet.blockscout.com/tx/";

export function PaymentPanel({
  synapse,
  initializing,
  initError,
}: {
  synapse: Synapse | null;
  initializing?: boolean;
  initError?: Error | null;
}) {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const {
    walletBalance,
    depositedBalance,
    loadingBalances,
    depositing,
    withdrawing,
    approvalTxHash,
    depositError,
    depositSuccess,
    deposit,
    withdraw,
    fetchBalances,
  } = useFilecoinPay(synapse);

  async function handleDeposit() {
    if (!depositAmount || Number(depositAmount) <= 0) return;
    await deposit(depositAmount);
    if (!depositError) setDepositAmount("");
  }

  async function handleWithdraw() {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;
    await withdraw(withdrawAmount);
    setWithdrawAmount("");
  }

  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        borderColor: "rgba(164,201,255,0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet size={12} style={{ color: "#A4C9FF" }} />
          <p
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: "#A4C9FF" }}
          >
            Filecoin Pay
          </p>
        </div>
        <button
          onClick={fetchBalances}
          disabled={loadingBalances || !synapse}
          className="transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Refresh balances"
        >
          <RefreshCw
            size={10}
            style={{ color: "#8A919F" }}
            className={loadingBalances ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Balances */}
      <div
        className="flex flex-col gap-2 p-3 rounded-lg mb-4"
        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
            Wallet (USDFC)
          </p>
          <p className="text-[10px] font-mono font-semibold" style={{ color: "#DFE2F3" }}>
            {fmtUSDFC(walletBalance)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
            Deposited
          </p>
          <p
            className="text-[10px] font-mono font-semibold"
            style={{
              color:
                depositedBalance !== null && depositedBalance > 0n
                  ? "#4AE183"
                  : "#DFE2F3",
            }}
          >
            {fmtUSDFC(depositedBalance)}
          </p>
        </div>
      </div>

      {/* Approval in-progress */}
      {approvalTxHash && (
        <div
          className="flex items-start gap-2 p-2 rounded mb-3"
          style={{
            backgroundColor: "rgba(255,185,85,0.08)",
            border: "1px solid rgba(255,185,85,0.2)",
          }}
        >
          <span className="text-[9px]" style={{ color: "#FFB955" }}>
            Approving USDFC…
          </span>
          <a
            href={`${BERYX_TX}${approvalTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-0.5 transition-opacity hover:opacity-70"
            style={{ color: "#FFB955" }}
          >
            <ExternalLink size={8} />
          </a>
        </div>
      )}

      {/* Deposit success */}
      {depositSuccess && !depositing && (
        <div
          className="p-2 rounded mb-3 text-[9px]"
          style={{
            backgroundColor: "rgba(74,225,131,0.08)",
            border: "1px solid rgba(74,225,131,0.2)",
            color: "#4AE183",
          }}
        >
          Deposit confirmed — storage credits added.
        </div>
      )}

      {/* Error */}
      {depositError && (
        <div
          className="flex items-start gap-1.5 p-2 rounded mb-3"
          style={{
            backgroundColor: "rgba(255,107,107,0.08)",
            border: "1px solid rgba(255,107,107,0.2)",
          }}
        >
          <AlertCircle size={10} style={{ color: "#FF6B6B", marginTop: 1, flexShrink: 0 }} />
          <p className="text-[9px] break-all" style={{ color: "#FF6B6B" }}>
            {depositError.message.slice(0, 100)}
          </p>
        </div>
      )}

      <div className="border-t mb-3" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Deposit / Withdraw form */}
      {!showWithdraw ? (
        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
            Deposit USDFC for storage
          </p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              min="0"
              step="0.01"
              disabled={!synapse || depositing}
              className="flex-1 text-[11px] px-2 py-1.5 rounded outline-none placeholder:opacity-30 disabled:opacity-40"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#DFE2F3",
              }}
            />
            <button
              onClick={handleDeposit}
              disabled={!synapse || !depositAmount || depositing || Number(depositAmount) <= 0}
              className="px-3 py-1.5 rounded text-[10px] font-semibold transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed min-w-[42px]"
              style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
            >
              {depositing ? "…" : "Fund"}
            </button>
          </div>
          <button
            onClick={() => setShowWithdraw(true)}
            className="text-[9px] text-left transition-opacity hover:opacity-70"
            style={{ color: "#8A919F" }}
          >
            Withdraw →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
            Withdraw USDFC
          </p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="0"
              step="0.01"
              disabled={!synapse || withdrawing}
              className="flex-1 text-[11px] px-2 py-1.5 rounded outline-none placeholder:opacity-30 disabled:opacity-40"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#DFE2F3",
              }}
            />
            <button
              onClick={handleWithdraw}
              disabled={!synapse || !withdrawAmount || withdrawing || Number(withdrawAmount) <= 0}
              className="px-3 py-1.5 rounded text-[10px] font-semibold transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed min-w-[42px]"
              style={{
                backgroundColor: "rgba(255,185,85,0.12)",
                color: "#FFB955",
                border: "1px solid rgba(255,185,85,0.25)",
              }}
            >
              {withdrawing ? "…" : "Out"}
            </button>
          </div>
          <button
            onClick={() => setShowWithdraw(false)}
            className="text-[9px] text-left transition-opacity hover:opacity-70"
            style={{ color: "#8A919F" }}
          >
            ← Deposit
          </button>
        </div>
      )}

      {/* Faucet hint for zero balance */}
      {synapse && walletBalance !== null && walletBalance === 0n && (
        <p className="text-[9px] mt-3" style={{ color: "#FFB955" }}>
          Need tUSDFC? Get some from the Calibration faucet.
        </p>
      )}

      {!synapse && (
        <p className="text-[9px] mt-3" style={{ color: initializing ? "#A4C9FF" : initError ? "#FF6B6B" : "#8A919F" }}>
          {initializing
            ? "Initializing SDK…"
            : initError
            ? "SDK error — check console"
            : "Connect wallet to manage storage credits."}
        </p>
      )}
    </div>
  );
}
