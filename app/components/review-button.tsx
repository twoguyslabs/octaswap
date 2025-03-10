import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { Dispatch, SetStateAction } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

export default function ReviewButton({
  onOpenTxConfirm,
  t0,
  t1,
  t0Amount,
  t1Amount,
  balance0,
  approveSimulation,
  swapSimulation,
}: {
  onOpenTxConfirm: Dispatch<SetStateAction<boolean>>;
  t0: UnionToken | undefined;
  t1: UnionToken | undefined;
  t0Amount: string | (bigint | undefined);
  t1Amount: string | (bigint | undefined);
  balance0: bigint | undefined;
  approveSimulation: any;
  swapSimulation: any;
}) {
  const { open } = useAppKit();
  const { isConnected } = useAccount();
  const isExceedBalance0 = balance0 && t0Amount ? (typeof t0Amount === "string" ? parseEther(t0Amount) > balance0 : t0Amount > balance0) : false;
  const disabled = !t0?.chainId || !t1?.chainId || !t0Amount || !t1Amount || isExceedBalance0 || (!approveSimulation && !swapSimulation);

  return isConnected ? (
    <Button size="lg" className="mt-5 w-full" onClick={() => onOpenTxConfirm(true)} disabled={disabled}>
      {isExceedBalance0 ? `Insufficient ${t0?.symbol}` : "Review"}
    </Button>
  ) : (
    <Button size="lg" className="mt-5 w-full" onClick={() => open({ view: "Connect" })}>
      Connect Wallet
    </Button>
  );
}
