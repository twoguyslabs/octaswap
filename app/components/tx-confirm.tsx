import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatStringAmount } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowDown, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { formatEther } from "viem";
import { BaseError, Config, usePublicClient, useWriteContract } from "wagmi";
import { WriteContractMutateAsync } from "wagmi/query";

function TokenInfo({
  tokenAmount,
  tokenSymbol,
  tokenPrice,
  tokenLogo,
}: {
  tokenAmount: string | (bigint | undefined);
  tokenSymbol: string | undefined;
  tokenPrice: string;
  tokenLogo: string | undefined;
}) {
  const amount = tokenAmount
    ? typeof tokenAmount === "string"
      ? tokenAmount
      : formatStringAmount(formatEther(tokenAmount))
    : "0";

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="text-2xl font-medium">
          {amount} {tokenSymbol}
        </div>
        <div className="text-muted-foreground">${tokenPrice}</div>
      </div>
      <div>{tokenLogo && <Image src={tokenLogo} alt={`${tokenSymbol} Logo`} width={40} height={40} />}</div>
    </div>
  );
}

export default function TxConfirm({
  openTxConfirm,
  onOpenTxConfirm,
  t0Amount,
  t0Symbol,
  t0Logo,
  t1Amount,
  t1Symbol,
  t1Logo,
  isAllowance,
  approveSimulation,
  swapSimulation,
  onResetAmount,
}: {
  openTxConfirm: boolean;
  onOpenTxConfirm: Dispatch<SetStateAction<boolean>>;
  t0Amount: string | (bigint | undefined);
  t0Symbol: string | undefined;
  t0Logo: string | undefined;
  t1Amount: string | (bigint | undefined);
  t1Symbol: string | undefined;
  t1Logo: string | undefined;
  isAllowance: boolean;
  approveSimulation: any;
  swapSimulation: any;
  onResetAmount: () => void;
}) {
  const publicClient = usePublicClient();

  const [isTxExecuting, setIsTxExecuting] = useState(false);

  const { isPending: isTxPending, writeContractAsync: writeTx } = useWriteContract();

  const disabled = (!approveSimulation && !swapSimulation) || isTxPending || isTxExecuting;

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
      return isAllowance ? "Swap" : "Approve";
    }
  };

  const handleClick = async (handler: WriteContractMutateAsync<Config, unknown>) => {
    try {
      setIsTxExecuting(true);
      if (!isAllowance) {
        const approveHash = await handler(approveSimulation?.request);
        try {
          await publicClient?.waitForTransactionReceipt({ hash: approveHash });
          toast.success("Approve successful!");
        } catch (e) {
          throw e;
        }
      } else {
        const swapHash = await handler(swapSimulation?.request);
        try {
          await publicClient?.waitForTransactionReceipt({ hash: swapHash });
          onResetAmount();
          onOpenTxConfirm(false);
          toast.success("Swap successful!");
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
    <Dialog open={openTxConfirm} onOpenChange={(open) => !isTxExecuting && onOpenTxConfirm(open)}>
      <DialogContent
        className="w-[90%] max-w-md rounded-lg"
        aria-describedby={undefined}
        onInteractOutside={(e) => isTxExecuting && e.preventDefault()}
      >
        <DialogHeader className="hidden">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">You&apos;re Swapping</div>
        <TokenInfo tokenAmount={t0Amount} tokenSymbol={t0Symbol} tokenPrice="0.28" tokenLogo={t0Logo} />
        <ArrowDown size={20} className="text-muted-foreground" />
        <TokenInfo tokenAmount={t1Amount} tokenSymbol={t1Symbol} tokenPrice="0.28" tokenLogo={t1Logo} />
        <Button className="mt-3" onClick={() => handleClick(writeTx)} disabled={disabled}>
          <span className="flex items-center gap-x-2">{getButtonText()}</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
