import { useEffect, useState } from "react";
import { erc20Abi, isAddress } from "viem";
import { useReadContract } from "wagmi";
import useChainId from "./use-chain-id";

export default function useCustomTokens(address: string) {
  const chainId = useChainId();
  const [customTokens, setCustomTokens] = useState<UnionToken[]>([]);

  const hexAddress = address as `0x${string}`;

  const { data: name } = useReadContract({
    abi: erc20Abi,
    address: hexAddress,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    abi: erc20Abi,
    address: hexAddress,
    functionName: "symbol",
  });

  const { data: decimals } = useReadContract({
    abi: erc20Abi,
    address: hexAddress,
    functionName: "decimals",
  });

  useEffect(() => {
    if (isAddress(address)) {
      if (chainId && address && name && symbol && decimals) {
        setCustomTokens([{ chainId, address, name, symbol, decimals, logoURI: "", isNative: false }]);
      } else {
        setCustomTokens([]);
      }
    } else {
      setCustomTokens([]);
    }
  }, [chainId, address, name, symbol, decimals]);

  return customTokens;
}
