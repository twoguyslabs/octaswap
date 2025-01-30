import { Coins } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import Image from "next/image";
import ethLogo from "@/assets/eth-logo.png";
import bnbLogo from "@/assets/bnb-logo.svg";
import ocsLogo from "@/assets/ocs-logo.svg";

export default function TokenList() {
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
    <>
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
                  priority
                  className="h-8 w-8"
                />
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold">{token.symbol}</span>
                  <span className="text-muted-foreground">{token.name}</span>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
