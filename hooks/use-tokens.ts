import { native } from "@/constants/native";
import { getTokenListUrl } from "@/lib/get-token-list-url";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

export default function useTokens() {
  const chainId = useChainId();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const nativeToken = native(chainId);
    const tokenListUrl = getTokenListUrl(chainId);

    if (tokenListUrl) {
      const fetchTokens = async () => {
        const response = await fetch(tokenListUrl);
        const data = await response.json();
        setTokens([nativeToken, ...data.tokens]);
      };

      fetchTokens();
    }

    if (nativeToken) {
      setTokens([nativeToken]);
    }
  }, [chainId]);

  return tokens;
}
