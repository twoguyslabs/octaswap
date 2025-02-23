import { WETH9 } from "@/constants/native";
import useAddress from "@/hooks/use-address";
import useDexConfig from "@/hooks/use-dex-config";
import { useChainId, useSimulateContract } from "wagmi";

export default function useRemoveLiquiditySimulation(t0Address: `0x${string}` | undefined, t1Address: `0x${string}` | undefined, liquidityToken: bigint) {
  const chainId = useChainId();
  const address = useAddress();
  const { ROUTER_ADDRESS, ROUTER_ABI } = useDexConfig();

  const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 5);

  const isWrapped = t0Address === WETH9[chainId].address || t1Address === WETH9[chainId].address;
  const tokenAddress = t0Address === WETH9[chainId].address ? t1Address : t0Address;

  const { data: removeLiquidity } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "removeLiquidity",
    args: t0Address && t1Address ? [t0Address, t1Address, liquidityToken, BigInt(0), BigInt(0), address, deadline] : undefined,
    query: {
      enabled: !isWrapped,
    },
  });

  const { data: removeLiquidityETH } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "removeLiquidityETH",
    args: tokenAddress ? [tokenAddress, liquidityToken, BigInt(0), BigInt(0), address, deadline] : undefined,
  });

  const removeLiquiditySimulation = removeLiquidity || removeLiquidityETH;

  return removeLiquiditySimulation;
}
