import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CircleHelp } from "lucide-react";
import useLiquidityPosition from "../hooks/use-liquidity-position";
import { formatEther } from "viem";
import { formatStringAmount } from "@/lib/utils";
import useToken from "@/hooks/use-token";
import Image from "next/image";

export default function LiquidityPosition({ pairIndex }: { pairIndex: number }) {
  const { liquidityToken, token0Address, token1Address, token0Symbol, token1Symbol, token0Amount, token1Amount, poolShare } = useLiquidityPosition(pairIndex);

  const { token: token0 } = useToken({ address: token0Address });
  const { token: token1 } = useToken({ address: token1Address });

  const formattedLiquidityToken = liquidityToken ? formatStringAmount(formatEther(liquidityToken)) : "0";
  const formattedToken0 = formatStringAmount(token0Amount.toString());
  const formattedToken1 = formatStringAmount(token1Amount.toString());
  const formattedPoolShare = formatStringAmount((poolShare * 100).toString());

  if (liquidityToken) {
    return (
      <Card>
        <CardContent className="p-4">
          <Collapsible>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2">
                  {token0?.logoURI ? (
                    <Image src={token0.logoURI} alt={`${token0.name} Logo`} width={100} height={100} quality={100} priority className="h-7 w-7" />
                  ) : (
                    <CircleHelp style={{ width: "1.75rem", height: "1.75rem" }} />
                  )}
                  {token1?.logoURI ? (
                    <Image src={token1.logoURI} alt={`${token1.name} Logo`} width={100} height={100} quality={100} priority className="h-7 w-7" />
                  ) : (
                    <CircleHelp style={{ width: "1.75rem", height: "1.75rem" }} />
                  )}
                </div>
                <div className="flex items-center gap-x-1">
                  <div>{token0Symbol}</div>/<div>{token1Symbol}</div>
                </div>
              </div>
              <CollapsibleTrigger className="flex items-center gap-x-1">
                Open
                <ChevronDown />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-3 pt-6">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Liquidity Token :</div>
                <div>{formattedLiquidityToken}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Deposited {token0Symbol} :</div>
                <div>{formattedToken0}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Deposited {token1Symbol} :</div>
                <div>{formattedToken1}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Pool Share :</div>
                <div>{formattedPoolShare}%</div>
              </div>
              {/* TODO: add and remove liquidity through address URL  */}
              {/* <div className="grid grid-cols-2 gap-x-4">
              <Button>Add Liquidity</Button>
              <Button>Remove Liquidity</Button>
            </div> */}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    );
  }
}
