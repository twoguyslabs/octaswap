import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { Dispatch, SetStateAction } from "react";
import { useAccount } from "wagmi";

export default function ReviewButton({
  t0Amount,
  t1Amount,
  onOpenTxConfirm,
}: {
  t0Amount: string;
  t1Amount: string;
  onOpenTxConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const { open } = useAppKit();
  const { isConnected } = useAccount();

  const disabled = t0Amount === "" && t1Amount === "";

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
