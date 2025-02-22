import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import useLiqduitiyPosition from "../hooks/use-liquidity-position";
import { useReadContract } from "wagmi";
import { erc20Abi, formatEther } from "viem";
import { formatStringAmount } from "@/lib/utils";

export default function LiquidityPosition({ pairIndex }: { pairIndex: number }) {
  const { liquidityToken, token0Address, token1Address, token0, token1, poolShare } = useLiqduitiyPosition(pairIndex);

  const { data: token0Symbol } = useReadContract({
    address: token0Address,
    abi: erc20Abi,
    functionName: "symbol",
  });

  const { data: token1Symbol } = useReadContract({
    address: token1Address,
    abi: erc20Abi,
    functionName: "symbol",
  });

  const formattedLiquidityToken = liquidityToken ? formatStringAmount(formatEther(liquidityToken)) : "0";
  const formattedToken0 = formatStringAmount(token0.toString());
  const formattedToken1 = formatStringAmount(token1.toString());
  const formattedPoolShare = formatStringAmount((poolShare * 100).toString());

  if (!liquidityToken) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <Collapsible>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1">
              <div>{token0Symbol}</div>/<div>{token1Symbol}</div>
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
