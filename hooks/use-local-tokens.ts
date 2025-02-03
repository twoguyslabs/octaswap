import { useLocalStorageState } from "ahooks";
import useChainId from "./use-chain-id";
import { useEffect, useMemo } from "react";

export default function useLocalTokens() {
  const chainId = useChainId();

  const [localTokens, setLocalTokens] = useLocalStorageState<TokenListIndex>(
    "localTokens",
    {
      defaultValue: {},
    },
  ) as [TokenListIndex, (value: TokenListIndex) => void];

  const localTokensByChainId = useMemo(() => {
    return chainId ? localTokens[chainId] || [] : [];
  }, [chainId, localTokens]);

  const setLocalTokensByChainId = (token: Token) => {
    if (!chainId) return;

    const updatedTokens = [...localTokensByChainId, token];

    setLocalTokens({
      ...localTokens,
      [chainId]: updatedTokens,
    });
  };

  useEffect(() => {
    console.log("localTokens", localTokens);
    console.log("localTokensByChainId", localTokensByChainId);
  }, [localTokens, localTokensByChainId]);

  return {
    localTokens: localTokensByChainId,
    setLocalTokens: setLocalTokensByChainId,
  };
}
