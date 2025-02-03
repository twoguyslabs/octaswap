import { useLocalStorageState } from "ahooks";
import useChainId from "./use-chain-id";
import { useEffect } from "react";

export default function useLocalTokens() {
  const chainId = useChainId();

  const [localTokensObject] = useLocalStorageState<TokenListIndex>(
    "localTokensObject",
    {
      defaultValue: {},
    },
  ) as [TokenListIndex, (value: TokenListIndex) => void];

  const [localTokens, setLocalTokens] = useLocalStorageState<Token[]>(
    "localTokens",
    {
      defaultValue: [],
    },
  ) as [Token[], (value: Token[]) => void];

  useEffect(() => {
    if (chainId) {
      if (localTokensObject[chainId]) {
        setLocalTokens(localTokensObject[chainId]);
      }
    }
  });

  return [localTokens, setLocalTokens] as const;
}
