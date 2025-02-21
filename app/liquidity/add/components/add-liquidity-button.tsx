import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BaseError, Config, usePublicClient, useWriteContract } from "wagmi";
import { WriteContractMutateAsync } from "wagmi/query";

export default function AddLiquidityButton({
  t0Symbol,
  t1Symbol,
  isT0Allowance,
  isT1Allowance,
  t0ApproveSimulation,
  t1ApproveSimulation,
  addLiquiditySimulation,
  onResetAmount,
}: {
  t0Symbol: string | undefined;
  t1Symbol: string | undefined;
  isT0Allowance: boolean;
  isT1Allowance: boolean;
  t0ApproveSimulation: any;
  t1ApproveSimulation: any;
  addLiquiditySimulation: any;
  onResetAmount: () => void;
}) {
  const publicClient = usePublicClient();
  const [isTxExecuting, setIsTxExecuting] = useState(false);
  const { isPending: isTxPending, writeContractAsync: writeTx } = useWriteContract();
  const disabled = (!t0ApproveSimulation && !t1ApproveSimulation && !addLiquiditySimulation) || isTxPending || isTxExecuting;

  const getButtonText = () => {
    if (isTxPending) {
      return (
        <>
          <LoaderIcon className="animate-spin" /> Confirm in wallet
        </>
      );
    } else if (isTxExecuting) {
      return (
        <>
          <LoaderIcon className="animate-spin" /> Executing transaction
        </>
      );
    } else {
      if (!t0Symbol || !t1Symbol) {
        return "Select tokens";
      }

      if (!isT0Allowance) {
        return `Approve ${t0Symbol}`;
      }

      if (!isT1Allowance) {
        return `Approve ${t1Symbol}`;
      }

      return "Add Liquidity";
    }
  };

  const handleClick = async (handler: WriteContractMutateAsync<Config, unknown>) => {
    try {
      setIsTxExecuting(true);
      if (!isT0Allowance) {
        const approveHash = await handler(t0ApproveSimulation?.request);
        try {
          await publicClient?.waitForTransactionReceipt({ hash: approveHash });
          toast.success(`Approve ${t0Symbol} successful!`);
        } catch (e) {
          throw e;
        }
      } else if (!isT1Allowance) {
        const approveHash = await handler(t1ApproveSimulation?.request);
        try {
          await publicClient?.waitForTransactionReceipt({ hash: approveHash });
          toast.success(`Approve ${t1Symbol} successful!`);
        } catch (e) {
          throw e;
        }
      } else {
        const addLiquidityHash = await handler(addLiquiditySimulation?.request);
        try {
          await publicClient?.waitForTransactionReceipt({ hash: addLiquidityHash });
          onResetAmount();
          toast.success("Add liquidity successful!");
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      toast.error((e as BaseError).shortMessage || (e as Error).message);
    } finally {
      setIsTxExecuting(false);
    }
  };

  return (
    <Button className="mt-5 w-full" disabled={disabled} onClick={() => handleClick(writeTx)}>
      {getButtonText()}
    </Button>
  );
}
