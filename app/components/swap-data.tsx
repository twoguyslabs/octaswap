import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn, formatStringAmount } from "@/lib/utils";
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
  const [isRotated, setIsRotated] = useState(false);

  const [symbol, setSymbol] = useState({
    symbol0: t0Symbol,
    symbol1: t1Symbol,
  });

  const [rate, setRate] = useState<bigint | undefined>(flatAmountsIn);

  const formattedRate = rate ? formatStringAmount(formatEther(rate)) : "0";
  const formattedMinMax = formatStringAmount(formatEther(minimumMaximum));

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
      <style jsx global>
        {`
          /* styles.css */
          .CollapsibleContent {
            overflow: hidden;
          }
          .CollapsibleContent[data-state="open"] {
            animation: slideDown 300ms ease-out;
          }
          .CollapsibleContent[data-state="closed"] {
            animation: slideUp 300ms ease-out;
          }

          @keyframes slideDown {
            from {
              height: 0;
            }
            to {
              height: var(--radix-collapsible-content-height);
            }
          }

          @keyframes slideUp {
            from {
              height: var(--radix-collapsible-content-height);
            }
            to {
              height: 0;
            }
          }
        `}
      </style>
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
        <CollapsibleTrigger onClick={() => setIsRotated(!isRotated)}>
          <ChevronDown
            size={20}
            className={cn("transform transition duration-300 ease-in-out", isRotated ? "rotate-180" : "")}
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="CollapsibleContent space-y-3 py-4">
        <div className="flex items-center justify-between">
          <div>Slippage</div>
          <div className="text-primary">{+slippage / 100}%</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Price Impact</div>
          <div className="text-green-400">{priceImpact}%</div>
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
