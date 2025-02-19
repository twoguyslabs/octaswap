"use client";

import DexBox from "@/app/components/dex-box";
import SwapTokenPlace from "@/app/components/swap-token-place";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAmount from "@/hooks/use-amount";
import useLiquidityRate from "@/hooks/use-liquidity-rate";
import useToken from "@/hooks/use-token";
import useTokenBalance from "@/hooks/use-token-balance";
import dynamic from "next/dynamic";

const Add = dynamic(
  () =>
    Promise.resolve(function Add() {
      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const { amount, setAmount0, setAmount1, swapAmountValue, resetAmount } = useAmount();

      const balance0 = useTokenBalance(token0);
      const balance1 = useTokenBalance(token1);

      const quote = useLiquidityRate(token0, token1, amount.amount0 || amount.amount1);
      return (
        <main className="grow">
          <div className="mx-auto min-h-full max-w-[29rem] px-4 sm:py-10 md:px-0">
            <Card>
              <CardContent className="px-4 py-5">
                <DexBox
                  label="Pair 1"
                  token={token0}
                  onSetToken={setToken0}
                  amount={amount.amount0}
                  onSetAmount={setAmount0}
                  tokenBalance={balance0}
                  rateAmounts={quote}
                />
                <SwapTokenPlace
                  token0={token0}
                  token1={token1}
                  onSetToken0={setToken0}
                  onSetToken1={setToken1}
                  onSwapAmountValue={swapAmountValue}
                />
                <DexBox
                  label="Pair 2"
                  token={token1}
                  onSetToken={setToken1}
                  amount={amount.amount1}
                  onSetAmount={setAmount1}
                  tokenBalance={balance1}
                  rateAmounts={quote}
                />
                <Button className="mt-5 w-full">Add Liquidity</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Add;
