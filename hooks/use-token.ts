import { useEffect, useState } from "react";
import useChainId from "./use-chain-id";
import { native } from "@/constants/native";

export default function useToken({ useNative }: { useNative: boolean }) {
  const chainId = useChainId();
  const [token, setToken] = useState<Token | undefined>();

  useEffect(() => {
    if (useNative) {
      setToken(native(chainId));
    } else {
      setToken(undefined);
    }
  }, [useNative, chainId]);

  return [token, setToken] as const;
}
