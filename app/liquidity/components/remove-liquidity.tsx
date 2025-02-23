import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import useAllowance from "@/hooks/use-allowance";
import useApproveSimulation from "@/hooks/use-approve-simulation";
import { formatStringAmount } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowDown, CircleHelp } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import useRemoveLiquiditySimulation from "../hooks/use-remove-liquidity-simulation";
import { BaseError, Config, usePublicClient, useWriteContract } from "wagmi";
import { WriteContractMutateAsync } from "wagmi/query";
import { toast } from "sonner";

export default function RemoveLiquidity({
  openRemoveLiquidity,
  onOpenRemoveLiquidity,
  pairAddress,
  liquidityToken,
  token0,
  token1,
  token0Address,
  token1Address,
  token0Symbol,
  token1Symbol,
  token0Amount,
  token1Amount,
}: {
  openRemoveLiquidity: boolean;
  onOpenRemoveLiquidity: Dispatch<SetStateAction<boolean>>;
  pairAddress: `0x${string}` | undefined;
  liquidityToken: bigint;
  token0: UnionToken | undefined;
  token1: UnionToken | undefined;
  token0Address: `0x${string}` | undefined;
  token1Address: `0x${string}` | undefined;
  token0Symbol: string | undefined;
  token1Symbol: string | undefined;
  token0Amount: number;
  token1Amount: number;
}) {
  const publicClient = usePublicClient();

  const [isTxExecuting, setIsTxExecuting] = useState(false);
  const [percentage, setPercentage] = useState(100);

  const lpToken = (liquidityToken * BigInt(percentage)) / BigInt(100);
  const reserveA = (token0Amount * percentage) / 100;
  const reserveB = (token1Amount * percentage) / 100;

  const formattedReserveA = formatStringAmount(reserveA.toString());
  const formattedReserveB = formatStringAmount(reserveB.toString());

  const { isAllowance } = useAllowance(pairAddress, lpToken);

  const liquidityTokenApprove = useApproveSimulation(pairAddress, lpToken, isAllowance);
  const removeLiquiditySimulation = useRemoveLiquiditySimulation(token0Address, token1Address, lpToken);

  const { isPending: isTxPending, writeContractAsync: writeTx } = useWriteContract();
  const disabled = isTxPending || isTxExecuting;

  const handleApprove = async (handler: WriteContractMutateAsync<Config, unknown>) => {
    try {
      setIsTxExecuting(true);

      // @ts-expect-error - `request` is not mixed in the type
      const approveHash = await handler(liquidityTokenApprove?.request);
      try {
        await publicClient?.waitForTransactionReceipt({ hash: approveHash });
        toast.success(`Approve LP successful!`);
      } catch (e) {
        throw e;
      }
    } catch (e) {
      toast.error((e as BaseError).shortMessage || (e as Error).message);
    } finally {
      setIsTxExecuting(false);
    }
  };

  const handleRemoveLiquidity = async (handler: WriteContractMutateAsync<Config, unknown>) => {
    try {
      setIsTxExecuting(true);

      // @ts-expect-error - `request` is not mixed in the type
      const removeLiquidityHash = await handler(removeLiquiditySimulation?.request);
      try {
        await publicClient?.waitForTransactionReceipt({ hash: removeLiquidityHash });
        onOpenRemoveLiquidity(false);
        toast.success("Remove liquidity successful!");
      } catch (e) {
        throw e;
      }
    } catch (e) {
      toast.error((e as BaseError).shortMessage || (e as Error).message);
    } finally {
      setIsTxExecuting(false);
    }
  };

  return (
    <Dialog open={openRemoveLiquidity} onOpenChange={(open) => !isTxExecuting && onOpenRemoveLiquidity(open)}>
      <DialogContent aria-describedby={undefined} className="w-[95%] rounded-lg" onInteractOutside={(e) => isTxExecuting && e.preventDefault()}>
        <DialogHeader className="hidden">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <div className="space-y-8">
          <div className="text-6xl font-bold">{percentage}%</div>
          <Slider value={[percentage]} max={100} onValueChange={(value) => setPercentage(value[0])} />
          <div className="grid grid-cols-4 gap-x-4">
            <Button size="sm" onClick={() => setPercentage(25)}>
              25%
            </Button>
            <Button size="sm" onClick={() => setPercentage(50)}>
              50%
            </Button>
            <Button size="sm" onClick={() => setPercentage(75)}>
              75%
            </Button>
            <Button size="sm" onClick={() => setPercentage(100)}>
              100%
            </Button>
          </div>
        </div>
        <ArrowDown className="mx-auto mt-3" />
        <div className="space-y-2 text-2xl">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">{formattedReserveA}</div>
            <div className="flex items-center gap-x-2">
              {token0?.logoURI ? (
                <Image src={token0.logoURI} alt={`${token0.name} Logo`} width={100} height={100} quality={100} priority className="h-7 w-7" />
              ) : (
                <CircleHelp style={{ width: "1.75rem", height: "1.75rem" }} />
              )}
              <div className="font-bold">{token0Symbol}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">{formattedReserveB}</div>
            <div className="flex items-center gap-x-2">
              {token1?.logoURI ? (
                <Image src={token1.logoURI} alt={`${token1.name} Logo`} width={100} height={100} quality={100} priority className="h-7 w-7" />
              ) : (
                <CircleHelp style={{ width: "1.75rem", height: "1.75rem" }} />
              )}
              <div className="font-bold">{token1Symbol}</div>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4">
          <Button size="sm" disabled={isAllowance || !liquidityTokenApprove || disabled} onClick={() => handleApprove(writeTx)}>
            Approve
          </Button>
          <Button size="sm" disabled={!removeLiquiditySimulation || disabled} onClick={() => handleRemoveLiquidity(writeTx)}>
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
