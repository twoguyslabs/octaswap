import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { formatStringAmount } from "@/lib/utils";
import { ChevronDown, Repeat } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { formatEther } from "viem";

export default function SwapData({
  collapsible,
  onSetCollapsible,
  t0Symbol,
  t1Symbol,
  a0,
  slippage,
  priceImpact,
  minimumMaximum,
  flatAmountsOut,
  flatAmountsIn,
}: {
  collapsible: boolean;
  onSetCollapsible: Dispatch<SetStateAction<boolean>>;
  t0Symbol: string;
  t1Symbol: string;
  a0: string;
  slippage: string;
  priceImpact: string;
  minimumMaximum: bigint;
  flatAmountsOut: bigint | undefined;
  flatAmountsIn: bigint | undefined;
}) {
  const [symbol, setSymbol] = useState({
    symbol0: t0Symbol,
    symbol1: t1Symbol,
  });

  const [rate, setRate] = useState<bigint | undefined>(flatAmountsIn);

  const formattedRate = rate ? formatStringAmount(formatEther(rate)) : "0";
  const formattedMinMax = formatStringAmount(formatEther(minimumMaximum));

  const getPriceImpactColor = (impact: number): string => {
    if (impact >= 5) return "!text-red-500";
    if (impact >= 3) return "!text-yellow-500";
    return "!text-green-400";
  };

  const handleSwitchRate = () => {
    if (rate === flatAmountsIn) {
      setRate(flatAmountsOut);
      setSymbol({ symbol0: symbol.symbol1, symbol1: symbol.symbol0 });
    } else {
      setRate(flatAmountsIn);
      setSymbol({ symbol0: symbol.symbol1, symbol1: symbol.symbol0 });
    }
  };

  return (
    <Collapsible className="p-4 text-sm text-muted-foreground" open={collapsible} onOpenChange={onSetCollapsible}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div>1 {symbol.symbol1}</div>
          <button onClick={handleSwitchRate}>
            <Repeat size={15} color="violet" />
          </button>
          <div>
            {formattedRate} {symbol.symbol0}
          </div>
        </div>
        <CollapsibleTrigger>
          <ChevronDown size={20} />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-3 py-4">
        <div className="flex items-center justify-between">
          <div>Slippage</div>
          <div className="text-primary">{+slippage / 100}%</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Price Impact</div>
          <div className={getPriceImpactColor(+priceImpact)}>{priceImpact}%</div>
        </div>
        {/* TODO: add transaction fee */}
        {/* <div className="flex items-center justify-between">
          <div>Transaction Fee</div>
          <div className="text-primary">0.0005 OCTA</div>
        </div> */}
        <div className="flex items-center justify-between">
          <div>{a0 ? "Minimum Received" : "Maximum Sold"}</div>
          <div className="text-primary">
            {formattedMinMax} {a0 ? t1Symbol : t0Symbol}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
