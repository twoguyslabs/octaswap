import { useEffect, useState } from "react";
import useChainId from "./use-chain-id";
import { NATIVE } from "@/constants/native";

export default function useToken({ useNative }: { useNative: boolean }) {
  const chainId = useChainId();
  const initial = useNative ? NATIVE[chainId] : undefined;

  const [token, setToken] = useState<UnionToken | undefined>(initial);

  useEffect(() => {
    setToken(initial);
  }, [initial]);

  return [token, setToken] as const;
}
