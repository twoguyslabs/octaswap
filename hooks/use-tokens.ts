import { getTokenListUrl } from "@/lib/get-token-list-url";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

export default function useTokens() {
  const chainId = useChainId();
  const [tokens, setTokens] = useState<Token[]>();

  useEffect(() => {
    const tokenListUrl = getTokenListUrl(chainId);

    const fetchTokens = async () => {
      const response = await fetch(tokenListUrl);
      const data = await response.json();
      setTokens(data.tokens);
    };
    fetchTokens();
  }, [chainId]);

  return tokens;
}
