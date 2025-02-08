import { CircleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { Input } from "../../components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { numericValidation } from "@/lib/utils";

export default function Slippage({ onSetSlippage }: { onSetSlippage: Dispatch<SetStateAction<string>> }) {
  const DEFAULT_SLIPPAGE = "50";
  const BPS_MULTIPLIER = 100;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!numericValidation.test(value)) return;
    if (value) {
      onSetSlippage((+value * BPS_MULTIPLIER).toString());
    } else {
      onSetSlippage(DEFAULT_SLIPPAGE);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div>Slippage</div>
        <TooltipProvider delayDuration={100} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <CircleAlert size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <span>Your transaction will revert if the price changes more than the slippage percentage.</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="basis-1/2">
        <div className="relative">
          <Input type="text" placeholder="0.5" onChange={handleChange} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">%</span>
        </div>
      </div>
    </div>
  );
}
