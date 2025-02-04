import { useEffect, useMemo, useState } from "react";
import useChainId from "./use-chain-id";
import { NATIVE } from "@/constants/native";
import { mockToken } from "@/lib/utils";

export default function useToken({ useNative }: { useNative: boolean }) {
  const chainId = useChainId();

  const defaultToken = useMemo(() => {
    return useNative ? NATIVE[chainId] : mockToken();
  }, [chainId, useNative]);

  const [token, setToken] = useState<UnionToken>(defaultToken);

  useEffect(() => {
    setToken(defaultToken);
  }, [defaultToken]);

  return [token, setToken] as const;
}
