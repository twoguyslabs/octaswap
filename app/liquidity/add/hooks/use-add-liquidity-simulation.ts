import useAddress from "@/hooks/use-address";
import useDexConfig from "@/hooks/use-dex-config";
import { parseEther } from "viem";
import { useSimulateContract } from "wagmi";

export default function useAddLiquiditySimulation(t0: UnionToken | undefined, t1: UnionToken | undefined, a0: string | bigint | undefined, a1: string | bigint | undefined) {
  const address = useAddress();
  const { ROUTER_ADDRESS, ROUTER_ABI } = useDexConfig();

  const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 5);

  const amount0 = a0 ? (typeof a0 === "string" ? parseEther(a0) : a0) : BigInt(0);
  const amount1 = a1 ? (typeof a1 === "string" ? parseEther(a1) : a1) : BigInt(0);

  const token = t0?.isNative ? t1?.address : t0?.address;
  const amount = t0?.isNative ? amount1 : amount0;
  const nativeAmount = t0?.isNative ? amount0 : amount1;

  const { data: addLiquidity } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "addLiquidity",
    // TODO: Add support for amountAMin and amountBMin and deadline
    // zero amountAMin and amountBMin and 5 minutes deadline
    args: t0 && t1 ? [t0?.address, t1?.address, amount0, amount1, BigInt(0), BigInt(0), address, deadline] : undefined,
    query: {
      enabled: !t0?.isNative && !t1?.isNative,
    },
  });

  const { data: addLiquidityETH } = useSimulateContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "addLiquidityETH",
    args: token ? [token, amount, BigInt(0), BigInt(0), address, deadline] : undefined,
    value: nativeAmount,
  });

  const addLiquiditySimulation = addLiquidity || addLiquidityETH;

  return addLiquiditySimulation;
}
