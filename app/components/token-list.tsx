import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useMemo } from "react";
import useTokens from "@/hooks/use-tokens";
import useLocalTokens from "@/hooks/use-local-tokens";
import useCustomTokens from "@/hooks/use-custom-tokens";
import { hasToken, matchQuery } from "@/lib/utils";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CircleHelp, Coins } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function TokenList({
  searchQuery,
  onSearchQuery,
  onSetToken,
  onOpenDialog,
}: {
  searchQuery: string;
  onSearchQuery: Dispatch<SetStateAction<string>>;
  onSetToken: Dispatch<SetStateAction<UnionToken>>;
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const tokens = useTokens();
  const { localTokens, setLocalTokens } = useLocalTokens();
  const customTokens = useCustomTokens(searchQuery);

  const mergedTokens = useMemo(() => {
    return [...tokens, ...localTokens];
  }, [tokens, localTokens]);

  const tokenList = useMemo(() => {
    const filteredTokens = mergedTokens
      .filter((token: UnionToken) => matchQuery(token, searchQuery))
      .sort((a, b) => {
        if (a.address === null) return -1;
        if (b.address === null) return 1;
        return a.symbol.localeCompare(b.symbol);
      });

    return filteredTokens.length > 0 ? filteredTokens : customTokens;
  }, [searchQuery, mergedTokens, customTokens]);

  const handleClick = (token: UnionToken) => {
    if (!hasToken(token, mergedTokens)) {
      setLocalTokens(token);
    }

    onSetToken(token);
    onOpenDialog(false);
  };

  return (
    <DialogContent className="h-fit w-[90%] overflow-hidden rounded-lg pt-14" aria-describedby={undefined}>
      <DialogHeader className="hidden">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
      </DialogHeader>
      <div className="space-y-5">
        <Input
          type="text"
          placeholder="Search tokens"
          value={searchQuery}
          onChange={(e) => onSearchQuery(e.target.value)}
        />
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <Coins size={20} />
            Tokens
          </div>
          <div className="grid">
            <ScrollArea className="h-[350px] pr-2.5">
              {tokenList?.map((token) => (
                <Button
                  key={token.name}
                  variant="ghost"
                  className="flex w-full justify-start gap-x-3 rounded-none py-8"
                  onClick={() => handleClick(token)}
                >
                  {token.logoURI ? (
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
                        <span className="text-lg font-bold">{token.symbol}</span>
                        <span className="text-muted-foreground">{token.name}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <CircleHelp style={{ width: "2rem", height: "2rem" }} />
                      <div className="flex flex-col items-start">
                        <span className="text-lg font-bold">{token.symbol}</span>
                        <span className="text-muted-foreground">{token.name}</span>
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
