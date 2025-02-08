import { CircleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { Input } from "../../components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { numericValidation } from "@/lib/utils";

export default function Deadline({ onSetDeadline }: { onSetDeadline: Dispatch<SetStateAction<string>> }) {
  const defaultDeadline = "5";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!numericValidation.test(value)) return;
    if (value) {
      onSetDeadline(value);
    } else {
      onSetDeadline(defaultDeadline);
    }
  };

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
              <span>Your transaction will revert if it is pending for more than this period of time.</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="basis-1/2">
        <div className="relative">
          <Input type="text" placeholder="5" onChange={handleChange} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">Min</span>
        </div>
      </div>
    </div>
  );
}
