import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

export default function SwapButton({
  isAllowance,
  onHandleClick,
  isPending,
}: {
  isAllowance: boolean;
  onHandleClick: () => void;
  isPending: boolean;
}) {
  const { isConnected } = useAccount();
  const { open } = useAppKit();
  return isConnected ? (
    <Button className="mt-5 w-full" onClick={onHandleClick} disabled={isPending}>
      {isAllowance ? "Swap" : "Approve"}
    </Button>
  ) : (
    <Button className="mt-5 w-full" onClick={() => open({ view: "Connect" })}>
      Connect Wallet
    </Button>
  );
}
