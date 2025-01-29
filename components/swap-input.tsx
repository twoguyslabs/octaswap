import { BiSolidWalletAlt } from "react-icons/bi";
import { Input } from "./ui/input";

export default function SwapInput() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div>From</div>
        <div className="flex items-center gap-x-1">
          <div>0</div>
          <BiSolidWalletAlt size={15} />
        </div>
      </div>
      <div>
        <Input
          type="text"
          placeholder="0.00"
          className="h-20 text-2xl font-bold"
        />
      </div>
    </div>
  );
}
