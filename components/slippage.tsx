import { CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Toggle } from "./ui/toggle";
import { Input } from "./ui/input";

export default function Slippage() {
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
              <span>
                Your transaction will revert if the price changes more than the
                slippage percentage.
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex basis-1/2 items-center gap-x-1">
        <Toggle variant="outline" className="font-bold" size="lg">
          Auto
        </Toggle>
        <Input type="text" placeholder="5%" />
      </div>
    </div>
  );
}
