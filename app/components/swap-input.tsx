import { Input } from "@/components/ui/input";
import { useDebounce } from "ahooks";
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
  const debouncedRate = useDebounce(rateAmounts, { wait: 300 });

  const rate = debouncedRate ? formatUnits(debouncedRate, 18) : "";
  const value = amount || rate;

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
