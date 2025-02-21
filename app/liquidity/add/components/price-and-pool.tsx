import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStringAmount } from "@/lib/utils";
import { formatEther } from "viem";

export default function PriceAndPool({
  t0Symbol,
  t1Symbol,
  flatQuoteOut,
  flatQuoteIn,
  poolShare,
}: {
  t0Symbol: string | undefined;
  t1Symbol: string | undefined;
  flatQuoteOut: bigint | undefined;
  flatQuoteIn: bigint | undefined;
  poolShare: number | undefined;
}) {
  const symbol0 = t0Symbol || "-";
  const symbol1 = t1Symbol || "-";

  const formattedFlatQuoteOut = flatQuoteOut ? formatStringAmount(formatEther(flatQuoteOut)) : "0";
  const formattedFlatQuoteIn = flatQuoteIn ? formatStringAmount(formatEther(flatQuoteIn)) : "0";
  const formattedPoolShare = poolShare ? formatStringAmount(poolShare.toString()) : "0";

  return (
    <Card className="mt-5">
      <CardContent className="p-0">
        <CardHeader className="p-4">
          <CardTitle className="text-base">Price and Pool</CardTitle>
        </CardHeader>
        <Card>
          <CardContent className="flex flex-col items-center justify-between gap-y-5 p-4 text-center sm:flex-row">
            <div>
              <div>{formattedFlatQuoteIn}</div>
              <div className="text-sm text-muted-foreground">
                {symbol0} per {symbol1}
              </div>
            </div>
            <div>
              <div>{formattedFlatQuoteOut}</div>
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
