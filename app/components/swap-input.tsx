import { Input } from "@/components/ui/input";
import { cn, formatStringAmount } from "@/lib/utils";
import { formatEther, parseEther } from "viem";

export default function SwapInput({
  amount,
  onSetAmount,
  rateAmounts,
  elementWidth,
  balance,
}: {
  amount: string;
  onSetAmount: (value: string) => void;
  rateAmounts: bigint | undefined;
  elementWidth: number;
  balance: bigint | undefined;
}) {
  const rate = rateAmounts ? formatEther(rateAmounts) : "";
  const formattedRate = formatStringAmount(rate);

  const value = amount || formattedRate;
  const paddingRight = elementWidth + 37;

  const isExceedBalance =
    balance && amount ? parseEther(amount) > balance : balance && rateAmounts ? rateAmounts > balance : false;

  return (
    <Input
      style={{ paddingRight: `${paddingRight}px` }}
      type="text"
      placeholder="0.00"
      className={cn("h-20 text-2xl font-bold placeholder:text-2xl md:text-2xl", isExceedBalance && "text-red-500")}
      value={value}
      onChange={(e) => onSetAmount(e.target.value)}
    />
  );
}
