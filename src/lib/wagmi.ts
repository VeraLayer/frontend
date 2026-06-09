import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const filecoinCalibration = defineChain({
  id: 314159,
  name: "Filecoin Calibration",
  nativeCurrency: { name: "testnet filecoin", symbol: "tFIL", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.calibration.node.glif.io/rpc/v1"] },
    public: { http: ["https://api.calibration.node.glif.io/rpc/v1"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://filecoin-testnet.blockscout.com" },
  },
  testnet: true,
});

export const wagmiConfig = getDefaultConfig({
  appName: "VeraLayer",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "veralayer-dev",
  chains: [filecoinCalibration],
  ssr: true,
});
