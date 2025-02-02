import { BiSolidWalletAlt } from "react-icons/bi";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import TokenList from "./token-list";

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
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="absolute inset-y-1/2 right-4 -translate-y-1/2"
            >
              {token?.chainId ? (
                <>
                  <Image
                    src={token.logoURL}
                    alt={`${token.name} Logo`}
                    width={100}
                    height={100}
                    quality={100}
                    priority
                    className="h-7 w-7"
                  />
                  <span className="text-xl font-bold">{token.symbol}</span>
                </>
              ) : (
                <span className="text-xl font-bold">Select token</span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[85%] w-[90%] overflow-hidden rounded-lg pt-14">
            <VisuallyHidden>
              <DialogHeader className="hidden">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </VisuallyHidden>
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
