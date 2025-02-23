import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useTokens from "@/hooks/use-tokens";
import useLocalTokens from "@/hooks/use-local-tokens";
import useCustomTokens from "@/hooks/use-custom-tokens";
import { hasToken, matchQuery } from "@/lib/utils";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CircleHelp, Coins } from "lucide-react";
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
  onSetToken: Dispatch<SetStateAction<UnionToken | undefined>>;
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
        if (a.isNative) return -1;
        if (b.isNative) return 1;
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

  // Row renderer for virtualized list
  const TokenRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const token = tokenList[index];

    return (
      <div style={style}>
        <Button variant="ghost" className="flex w-full justify-start gap-x-3 rounded-none py-8" onClick={() => handleClick(token)}>
          {token.logoURI ? (
            <>
              <Image src={token.logoURI} alt={`${token.name} logo`} width={100} height={100} quality={100} priority className="h-8 w-8" />
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
      </div>
    );
  };

  return (
    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="h-fit w-[95%] overflow-hidden rounded-lg pt-14" aria-describedby={undefined}>
      <DialogHeader className="hidden">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
      </DialogHeader>
      <div className="space-y-5">
        <Input type="text" placeholder="Search tokens" value={searchQuery} onChange={(e) => onSearchQuery(e.target.value)} />
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <Coins size={20} />
            Tokens
          </div>
          <div className="relative grid h-[350px]">
            <style jsx global>{`
              /* Hide scrollbar for Chrome, Safari and Opera */
              .token-list::-webkit-scrollbar {
                display: none;
              }

              /* Hide scrollbar for IE, Edge and Firefox */
              .token-list {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
              }
            `}</style>
            <AutoSizer>
              {({ height, width }) => (
                <List className="token-list" height={height} width={width} itemCount={tokenList.length} itemSize={65} overscanCount={5}>
                  {TokenRow}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
