import { erc20Abi } from "viem";
import { useBalance, useReadContract } from "wagmi";
import useAddress from "./use-address";

export default function useTokenBalance(token: UnionToken | undefined) {
  const address = useAddress();
  const isNative = token?.isNative ? true : false;

  const { data: nativeBalance } = useBalance({
    address,
  });

  const { data: tokenBalance } = useReadContract({
    abi: erc20Abi,
    address: token?.address,
    functionName: "balanceOf",
    args: [address],
  });

  const balance = isNative ? nativeBalance?.value : tokenBalance;

  return balance;
}
