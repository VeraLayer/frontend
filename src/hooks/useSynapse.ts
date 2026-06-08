"use client";

import { useState, useEffect, useRef } from "react";
import { useWalletClient, useAccount } from "wagmi";
import { custom } from "viem";
import { Synapse, calibration } from "@filoz/synapse-sdk";

export function useSynapse() {
  const [synapse, setSynapse] = useState<Synapse | null>(null);
  const [initializing, setInitializing] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const prevAddressRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!walletClient || !isConnected || !walletClient.account) {
      setSynapse(null);
      prevAddressRef.current = undefined;
      return;
    }

    if (prevAddressRef.current === address) return;
    prevAddressRef.current = address;

    setInitializing(true);
    setInitError(null);
    setSynapse(null);

    try {
      const s = Synapse.create({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transport: custom(walletClient.transport as any),
        chain: calibration,
        account: walletClient.account,
        source: "VeraLayer",
      });
      setSynapse(s);
    } catch (e: unknown) {
      setInitError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setInitializing(false);
    }
  }, [walletClient, isConnected, address]);

  return { synapse, initializing, initError };
}
