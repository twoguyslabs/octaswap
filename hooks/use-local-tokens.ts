import { useLocalStorageState } from "ahooks";
import useChainId from "./use-chain-id";

export default function useLocalTokens() {
  const chainId = useChainId();

  const [localTokens, setLocalTokens] = useLocalStorageState<TokenListIndex>(
    "localTokens",
    {
      defaultValue: {},
    },
  ) as [TokenListIndex, (value: TokenListIndex) => void];

  const localTokensByChainId = chainId ? localTokens[chainId] || [] : [];

  const setLocalTokensByChainId = (token: Token) => {
    if (!chainId) return;

    const updatedTokens = [...localTokensByChainId, token];

    setLocalTokens({
      ...localTokens,
      [chainId]: updatedTokens,
    });
  };

  return {
    localTokens: localTokensByChainId,
    setLocalTokens: setLocalTokensByChainId,
  };
}
