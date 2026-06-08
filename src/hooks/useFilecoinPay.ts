"use client";

import { useState, useCallback, useEffect } from "react";
import { type Synapse, parseUnits, formatUnits } from "@filoz/synapse-sdk";

export const USDFC_DECIMALS = 18;

export function fmtUSDFC(n: bigint | null): string {
  if (n === null) return "—";
  return Number(formatUnits(n, { decimals: USDFC_DECIMALS })).toFixed(4);
}

export function useFilecoinPay(synapse: Synapse | null) {
  const [walletBalance, setWalletBalance] = useState<bigint | null>(null);
  const [depositedBalance, setDepositedBalance] = useState<bigint | null>(null);
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [approvalTxHash, setApprovalTxHash] = useState<string | null>(null);
  const [depositError, setDepositError] = useState<Error | null>(null);
  const [depositSuccess, setDepositSuccess] = useState(false);

  const fetchBalances = useCallback(async () => {
    if (!synapse) return;
    setLoadingBalances(true);
    try {
      const [wb, db] = await Promise.all([
        synapse.payments.walletBalance(),
        synapse.payments.balance(),
      ]);
      setWalletBalance(wb);
      setDepositedBalance(db);
    } catch {
      // balances unavailable — leave as null
    } finally {
      setLoadingBalances(false);
    }
  }, [synapse]);

  useEffect(() => {
    if (synapse) {
      fetchBalances();
    } else {
      setWalletBalance(null);
      setDepositedBalance(null);
    }
  }, [synapse, fetchBalances]);

  const deposit = useCallback(
    async (amountUSDFC: string) => {
      if (!synapse) return;
      const amount = parseUnits(amountUSDFC, USDFC_DECIMALS);
      if (amount <= 0n) return;

      setDepositing(true);
      setDepositError(null);
      setDepositSuccess(false);
      setApprovalTxHash(null);

      try {
        await synapse.payments.deposit({
          amount,
          onApprovalTransaction: (tx: string) => {
            setApprovalTxHash(tx);
          },
          onDepositStarting: () => {
            setApprovalTxHash(null);
          },
        });
        await fetchBalances();
        setDepositSuccess(true);
      } catch (e: unknown) {
        setDepositError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setDepositing(false);
      }
    },
    [synapse, fetchBalances]
  );

  const withdraw = useCallback(
    async (amountUSDFC: string) => {
      if (!synapse) return;
      const amount = parseUnits(amountUSDFC, USDFC_DECIMALS);
      if (amount <= 0n) return;

      setWithdrawing(true);
      try {
        await synapse.payments.withdraw({ amount });
        await fetchBalances();
      } finally {
        setWithdrawing(false);
      }
    },
    [synapse, fetchBalances]
  );

  return {
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
  };
}
