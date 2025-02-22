import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import usePairAddress from "@/hooks/use-pair-address";
import { formatStringAmount } from "@/lib/utils";
import { formatEther } from "viem";

export default function PriceAndPool({
  t0,
  t1,
  a0,
  a1,
  flatQuoteOut,
  flatQuoteIn,
  poolShare,
}: {
  t0: UnionToken | undefined;
  t1: UnionToken | undefined;
  a0: string;
  a1: string;
  flatQuoteOut: bigint | undefined;
  flatQuoteIn: bigint | undefined;
  poolShare: number | undefined;
}) {
  const { isPairExist } = usePairAddress(t0, t1);

  const symbol0 = t0?.symbol || "-";
  const symbol1 = t1?.symbol || "-";

  const formattedFlatQuoteOut = flatQuoteOut ? formatStringAmount(formatEther(flatQuoteOut)) : "0";
  const formattedFlatQuoteIn = flatQuoteIn ? formatStringAmount(formatEther(flatQuoteIn)) : "0";
  const formattedPoolShare = poolShare ? formatStringAmount((poolShare * 100).toString()) : "0";

  const quoteOut = isPairExist ? formattedFlatQuoteOut : a0 && a1 ? formatStringAmount((Number(a0) / Number(a1)).toString()) : "0";
  const quoteIn = isPairExist ? formattedFlatQuoteIn : a0 && a1 ? formatStringAmount((Number(a1) / Number(a0)).toString()) : "0";

  return (
    <Card className="mt-5">
      <CardContent className="p-0">
        <CardHeader className="p-4">
          <CardTitle className="text-base">Price and Pool</CardTitle>
        </CardHeader>
        <Card>
          <CardContent className="flex flex-col items-center justify-between gap-y-5 p-4 text-center sm:flex-row">
            <div>
              <div>{quoteIn}</div>
              <div className="text-sm text-muted-foreground">
                {symbol0} per {symbol1}
              </div>
            </div>
            <div>
              <div>{quoteOut}</div>
              <div className="text-sm text-muted-foreground">
                {symbol1} per {symbol0}
              </div>
            </div>
            <div>
              <div>{formattedPoolShare}%</div>
              <div className="text-sm text-muted-foreground">Pool Share</div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
