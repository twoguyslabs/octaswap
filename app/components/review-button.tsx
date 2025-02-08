import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { Dispatch, SetStateAction } from "react";
import { useAccount } from "wagmi";

export default function ReviewButton({
  t0ChainId,
  t1ChainId,
  t0Amount,
  t1Amount,
  onOpenTxConfirm,
  approveSimulation,
  swapSimulation,
}: {
  t0ChainId: number | undefined;
  t1ChainId: number | undefined;
  t0Amount: string | (bigint | undefined);
  t1Amount: string | (bigint | undefined);
  onOpenTxConfirm: Dispatch<SetStateAction<boolean>>;
  approveSimulation: any;
  swapSimulation: any;
}) {
  const { open } = useAppKit();
  const { isConnected } = useAccount();

  const disabled = !t0ChainId || !t1ChainId || !t0Amount || !t1Amount || (!approveSimulation && !swapSimulation);

  return isConnected ? (
    <Button className="mt-5 w-full" onClick={() => onOpenTxConfirm(true)} disabled={disabled}>
      Review
    </Button>
  ) : (
    <Button className="mt-5 w-full" onClick={() => open({ view: "Connect" })}>
      Connect Wallet
    </Button>
  );
}
