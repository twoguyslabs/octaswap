"use client";

import SwapBox from "@/app/components/swap-box";
import SwapSettings from "@/app/components/swap-settings";
import SwapTokenPlace from "@/app/components/swap-token-place";
import { Card, CardContent } from "@/components/ui/card";
import useAllowance from "@/hooks/use-allowance";
import useAmount from "@/hooks/use-amount";
import useApprove from "@/hooks/use-approve";
import usePairReserves from "@/hooks/use-pair-reserves";
import useSwapRate from "@/hooks/use-swap-rate";
import useSwapSimulation from "@/hooks/use-swap-simulation";
import useToken from "@/hooks/use-token";
import { swap } from "@/lib/swap";
import dynamic from "next/dynamic";
import SwapButton from "./components/swap-button";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const { amount, setAmount0, setAmount1, swapAmountValue } = useAmount();

      const reserves = usePairReserves(token0, token1);

      const { getAmountsOut, getAmountsIn } = useSwapRate(token0, token1, amount.amount0, amount.amount1);

      const { isAllowance } = useAllowance(token0, amount.amount0);

      const { handleApprove, isApprovePending } = useApprove(token0?.address, amount.amount0 || getAmountsIn);

      const { swapExactInput, swapExactOutput } = swap(token0, token1, amount.amount0, amount.amount1, reserves);

      const { handleSwap, isSwapPending } = useSwapSimulation(token0, token1, swapExactInput, swapExactOutput);

      const handleClick = isAllowance ? handleSwap : handleApprove;

      return (
        <main>
          <div className="mx-auto max-w-[30rem] px-4 sm:pt-10 md:px-0">
            <div className="space-y-2">
              <SwapSettings />
              <Card>
                <CardContent className="px-4 py-5">
                  <SwapBox
                    token={token0}
                    onSetToken={setToken0}
                    amount={amount.amount0}
                    onSetAmount={setAmount0}
                    rateAmounts={getAmountsIn}
                  />
                  <SwapTokenPlace
                    token0={token0}
                    token1={token1}
                    onSetToken0={setToken0}
                    onSetToken1={setToken1}
                    onSwapAmountValue={swapAmountValue}
                  />
                  <SwapBox
                    token={token1}
                    onSetToken={setToken1}
                    amount={amount.amount1}
                    onSetAmount={setAmount1}
                    rateAmounts={getAmountsOut}
                  />
                  <SwapButton
                    isAllowance={isAllowance}
                    onHandleClick={handleClick}
                    isApprovePending={isApprovePending}
                    isSwapPending={isSwapPending}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Swap;
