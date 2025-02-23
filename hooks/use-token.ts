import { useEffect, useState } from "react";
import useChainId from "./use-chain-id";
import { NATIVE } from "@/constants/native";
import useTokens from "./use-tokens";

export default function useToken({ address, useNative }: { address?: `0x${string}`; useNative?: boolean }) {
  const chainId = useChainId();
  const [token, setToken] = useState<UnionToken | undefined>();

  const tokens = useTokens();

  useEffect(() => {
    if (address) {
      const token = tokens.find((token) => token.address === address);
      setToken(token);
    } else if (useNative) {
      setToken(NATIVE[chainId]);
    } else {
      setToken(undefined);
    }
  }, [address, tokens, useNative, chainId]);

  return { token, setToken };
}
