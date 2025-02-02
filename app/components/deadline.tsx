import { CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Input } from "../../components/ui/input";

export default function Deadline() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div>Tx. Deadline</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <CircleAlert size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <span>
                Your transaction will revert if it is pending for more than this
                period of time.
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="basis-1/2">
        <Input type="text" placeholder="5 minutes" />
      </div>
    </div>
  );
}
