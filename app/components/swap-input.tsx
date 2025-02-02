import { BiSolidWalletAlt } from "react-icons/bi";
import { Input } from "../../components/ui/input";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import TokenList from "./token-list";
import TokenListTrigger from "./token-list-trigger";

export default function SwapInput({ token }: { token: Token | undefined }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div>From</div>
        <div className="flex items-center gap-x-1">
          <div>0</div>
          <BiSolidWalletAlt size={15} />
        </div>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="0.00"
          className="h-20 pr-32 text-2xl font-bold placeholder:text-2xl md:text-2xl"
        />
        <Dialog>
          <TokenListTrigger token={token} />
          <DialogContent className="h-[85%] w-[90%] overflow-hidden rounded-lg pt-14">
            <div className="space-y-5">
              <Input type="text" placeholder="Search tokens" />
              <TokenList />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
