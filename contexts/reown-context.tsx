"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, sepolia, bsc } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { config, isDevelopment, projectId, wagmiAdapter } from "@/config/wagmi";
import { monadTestnet, octaspace } from "@/config/chains";

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: "OctaSwap",
  description: "OctaSwap - Trade. Stake. Launch",
  url: "https://app.octaswap.io", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: isDevelopment ? [octaspace, mainnet, bsc, sepolia, monadTestnet] : [octaspace, bsc],
  defaultNetwork: octaspace,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  chainImages: {
    800001: "/octa-logo.svg",
    11155111: "/eth-logo.png",
    10143: "/monad-logo.svg",
  },
});

function ReownProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(config, cookies);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ReownProvider;
