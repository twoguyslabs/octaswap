import { getTokenListUrl } from "@/lib/get-token-list-url";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

export default function useTokenList() {
  const chainId = useChainId();
  const [tokenList, setTokenList] = useState<Token[]>();

  useEffect(() => {
    const tokenListUrl = getTokenListUrl(chainId);

    const fetchTokens = async () => {
      const response = await fetch(tokenListUrl);
      const data = await response.json();
      setTokenList(data.tokens);
    };
    fetchTokens();
  }, [chainId]);

  return tokenList;
}
