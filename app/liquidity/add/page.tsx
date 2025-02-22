"use client";

import DexBox from "@/app/components/dex-box";
import { Card, CardContent } from "@/components/ui/card";
import useAmount from "@/hooks/use-amount";
import useLiquidityRate from "@/hooks/use-liquidity-rate";
import useToken from "@/hooks/use-token";
import useTokenBalance from "@/hooks/use-token-balance";
import dynamic from "next/dynamic";
import PriceAndPool from "./components/price-and-pool";
import { Plus } from "lucide-react";
import usePoolShare from "@/hooks/use-pool-share";
import useAllowance from "@/hooks/use-allowance";
import useApproveSimulation from "@/hooks/use-approve-simulation";
import useAddLiquiditySimulation from "./hooks/use-add-liquidity-simulation";
import AddLiquidityButton from "./components/add-liquidity-button";

const Add = dynamic(
  () =>
    Promise.resolve(function Add() {
      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const { amount, setAmount0, setAmount1, resetAmount } = useAmount(token0, token1);

      const balance0 = useTokenBalance(token0);
      const balance1 = useTokenBalance(token1);

      const { quoteOut, quoteIn, flatQuoteOut, flatQuoteIn } = useLiquidityRate(token0, token1, amount.amount0, amount.amount1);
      const poolShare = usePoolShare(token0, token1, amount.amount0 || quoteIn, amount.amount1 || quoteOut);

      const { isAllowance: isT0Allowance } = useAllowance(token0, amount.amount0 || quoteIn);
      const { isAllowance: isT1Allowance } = useAllowance(token1, amount.amount1 || quoteOut);

      const t0ApproveSimulation = useApproveSimulation(token0, amount.amount0 || quoteIn, isT0Allowance);
      const t1ApproveSimulation = useApproveSimulation(token1, amount.amount1 || quoteOut, isT1Allowance);

      const addLiquiditySimulation = useAddLiquiditySimulation(token0, token1, amount.amount0 || quoteIn, amount.amount1 || quoteOut);
      return (
        <main className="grow">
          <div className="mx-auto min-h-full max-w-[29rem] px-4 py-5 sm:py-10 md:px-0">
            <Card>
              <CardContent className="px-4 py-5">
                <DexBox label={null} token={token0} onSetToken={setToken0} amount={amount.amount0} onSetAmount={setAmount0} tokenBalance={balance0} rateAmounts={quoteIn} />
                <Plus className="mx-auto mt-7" />
                <DexBox label={null} token={token1} onSetToken={setToken1} amount={amount.amount1} onSetAmount={setAmount1} tokenBalance={balance1} rateAmounts={quoteOut} />
                <PriceAndPool t0={token0} t1={token1} a0={amount.amount0} a1={amount.amount1} flatQuoteOut={flatQuoteOut} flatQuoteIn={flatQuoteIn} poolShare={poolShare} />
                <AddLiquidityButton
                  t0Symbol={token0?.symbol}
                  t1Symbol={token1?.symbol}
                  t0Amount={amount.amount0 || quoteIn}
                  balance0={balance0}
                  isT0Allowance={isT0Allowance}
                  isT1Allowance={isT1Allowance}
                  t0ApproveSimulation={t0ApproveSimulation}
                  t1ApproveSimulation={t1ApproveSimulation}
                  addLiquiditySimulation={addLiquiditySimulation}
                  onResetAmount={resetAmount}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Add;
