import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
        className="w-[90%] rounded-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="py-4">
          <DialogTitle>Swap Settings</DialogTitle>
          <VisuallyHidden>
            <DialogDescription></DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Slippage />
        <Deadline />
      </DialogContent>
    </Dialog>
  );
}
