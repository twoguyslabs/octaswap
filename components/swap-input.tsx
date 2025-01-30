import { BiSolidWalletAlt } from "react-icons/bi";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Coins } from "lucide-react";
import { Button } from "./ui/button";
import ethLogo from "@/assets/eth-logo.png";
import bnbLogo from "@/assets/bnb-logo.svg";
import ocsLogo from "@/assets/ocs-logo.svg";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";

export default function SwapInput() {
  const tokens = [
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: ethLogo,
    },
    {
      name: "Binance Smart Chain",
      symbol: "BNB",
      logo: bnbLogo,
    },
    {
      name: "Octa Space",
      symbol: "OCS",
      logo: ocsLogo,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: ethLogo,
    },
    {
      name: "Binance Smart Chain",
      symbol: "BNB",
      logo: bnbLogo,
    },
    {
      name: "Octa Space",
      symbol: "OCS",
      logo: ocsLogo,
    },
  ];
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
          className="h-20 pr-32 text-2xl font-bold"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="absolute inset-y-1/2 right-4 -translate-y-1/2"
            >
              <Image
                src={ocsLogo}
                alt="OCS Logo"
                width={0}
                height={0}
                quality={100}
                className="h-6 w-6"
              />
              <span className="text-xl font-bold">OCS</span>
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
              {/* TOKEN SEARCH */}
              <div>
                <Input type="text" placeholder="Search tokens" />
              </div>
              {/* TOKEN LIST */}
              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <Coins size={20} />
                  Tokens
                </div>
                <div className="grid">
                  <ScrollArea className="h-[95%] pr-2.5">
                    {tokens.map((token, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="flex w-full justify-start gap-x-3 rounded-none py-8"
                      >
                        <Image
                          src={token.logo}
                          alt="OCS Logo"
                          width={0}
                          height={0}
                          quality={100}
                          className="h-8 w-8"
                        />
                        <div className="flex flex-col items-start">
                          <span className="text-lg font-bold">
                            {token.symbol}
                          </span>
                          <span className="text-muted-foreground">
                            {token.name}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
