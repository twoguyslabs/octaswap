import { Coins } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useTokens from "@/hooks/use-tokens";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { matchQuery } from "@/lib/utils";

export default function TokenList({
  onSetToken,
  onOpenDialog,
}: {
  onSetToken: Dispatch<SetStateAction<Token | undefined>>;
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const tokens = useTokens();

  const filteredTokens = useMemo(
    () => tokens?.filter((token) => matchQuery(token, searchQuery)),
    [searchQuery, tokens],
  );

  const handleClick = (token: Token) => {
    onSetToken(token);
    onOpenDialog(false);
  };

  return (
    <DialogContent className="h-[85%] w-[90%] overflow-hidden rounded-lg pt-14">
      <div className="space-y-5">
        <Input
          type="text"
          placeholder="Search tokens"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <Coins size={20} />
            Tokens
          </div>
          <div className="grid">
            <ScrollArea className="h-[95%] pr-2.5">
              {filteredTokens?.map((token) => (
                <Button
                  key={token.name}
                  variant="ghost"
                  className="flex w-full justify-start gap-x-3 rounded-none py-8"
                  onClick={() => handleClick(token)}
                >
                  {token.logoURI && (
                    <>
                      <Image
                        src={token.logoURI}
                        alt={`${token.name} logo`}
                        width={100}
                        height={100}
                        quality={100}
                        priority
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
                    </>
                  )}
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
