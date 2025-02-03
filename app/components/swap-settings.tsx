import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import Slippage from "./slippage";
import Deadline from "./deadline";

export default function SwapSettings() {
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
        className="w-[90%] max-w-md rounded-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader className="py-4">
          <DialogTitle>Swap Settings</DialogTitle>
        </DialogHeader>
        <Slippage />
        <Deadline />
      </DialogContent>
    </Dialog>
  );
}
