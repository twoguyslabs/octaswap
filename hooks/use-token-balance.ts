import { erc20Abi } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export default function useTokenBalance(token: Token | undefined) {
  const isNullAddress = token?.address === null;

  const { address } = useAccount();

  const { data: nativeBalance } = useBalance({
    address,
    query: {
      enabled: !!address && isNullAddress,
    },
  });

  const { data: tokenBalance } = useReadContract({
    abi: erc20Abi,
    address: token?.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address && !isNullAddress,
    },
  });

  const balance = isNullAddress ? nativeBalance?.value : tokenBalance;

  return balance;
}
