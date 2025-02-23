import { PAIR_ABI } from "@/contracts/octaspace/dex/pair";
import useAddress from "@/hooks/use-address";
import useDexConfig from "@/hooks/use-dex-config";
import { erc20Abi, formatEther } from "viem";
import { useReadContract } from "wagmi";

export default function useLiquidityPosition(pairIndex: number) {
  const address = useAddress();
  const { FACTORY_ADDRESS, FACTORY_ABI } = useDexConfig();

  const { data: pairAddress } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "allPairs",
    args: [BigInt(pairIndex)],
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: reserves } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: "getReserves",
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: pairTotalSupply } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: "totalSupply",
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: liquidityToken } = useReadContract({
    address: pairAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: token0Address } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: "token0",
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: token1Address } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: "token1",
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: token0Symbol } = useReadContract({
    address: token0Address,
    abi: erc20Abi,
    functionName: "symbol",
    query: {
      refetchInterval: 1000,
    },
  });

  const { data: token1Symbol } = useReadContract({
    address: token1Address,
    abi: erc20Abi,
    functionName: "symbol",
    query: {
      refetchInterval: 1000,
    },
  });

  const [reserve0, reserve1] = reserves ?? [];

  const poolShare = pairTotalSupply && liquidityToken ? Number(formatEther(liquidityToken)) / Number(formatEther(pairTotalSupply)) : 0;

  const token0 = reserve0 ? poolShare * Number(formatEther(reserve0)) : 0;
  const token1 = reserve1 ? poolShare * Number(formatEther(reserve1)) : 0;

  return { liquidityToken, token0Address, token1Address, token0Symbol, token1Symbol, token0, token1, poolShare };
}
