import { Input } from "@/components/ui/input";
import { formatStringAmount } from "@/lib/utils";
import { formatUnits } from "viem";

export default function SwapInput({
  amount,
  onSetAmount,
  rateAmounts,
  elementWidth,
}: {
  amount: string;
  onSetAmount: (value: string) => void;
  rateAmounts: bigint | undefined;
  elementWidth: number;
}) {
  const rate = rateAmounts ? formatUnits(rateAmounts, 18) : "";
  const formattedRate = formatStringAmount(rate);

  const value = amount || formattedRate;

  const paddingRight = elementWidth + 37;

  return (
    <Input
      style={{ paddingRight: `${paddingRight}px` }}
      type="text"
      placeholder="0.00"
      className="h-20 text-2xl font-bold placeholder:text-2xl md:text-2xl"
      value={value}
      onChange={(e) => onSetAmount(e.target.value)}
    />
  );
}
