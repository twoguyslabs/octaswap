import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import Slippage from "./slippage";
import Deadline from "./deadline";
import { Dispatch, SetStateAction } from "react";

export default function SwapSettings({
  onSetSlippage,
  onSetDeadline,
}: {
  onSetSlippage: Dispatch<SetStateAction<string>>;
  onSetDeadline: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Dialog>
      <div className="text-right">
        <DialogTrigger asChild>
          <button>
            <Settings size={20} />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent
        className="w-[95%] max-w-md rounded-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader className="py-4">
          <DialogTitle>Swap Settings</DialogTitle>
        </DialogHeader>
        <Slippage onSetSlippage={onSetSlippage} />
        <Deadline onSetDeadline={onSetDeadline} />
      </DialogContent>
    </Dialog>
  );
}
