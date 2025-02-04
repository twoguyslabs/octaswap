import { useEffect, useState } from "react";
import { useAccount, useChainId as useWagmiChainId } from "wagmi";

export default function useChainId() {
  const offlineChainId = useWagmiChainId();
  const { isConnected, chainId: onlineChainId } = useAccount();

  const [chainId, setChainId] = useState<number>(offlineChainId);

  useEffect(() => {
    if (isConnected) {
      if (onlineChainId) {
        setChainId(onlineChainId);
      }
    } else {
      setChainId(offlineChainId);
    }
  }, [isConnected, onlineChainId, offlineChainId]);

  return chainId;
}
