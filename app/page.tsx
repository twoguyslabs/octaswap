"use client";

import SwapBox from "@/app/components/swap-box";
import SwapSettings from "@/app/components/swap-settings";
import SwapTokenPlace from "@/app/components/swap-token-place";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";
import useAllowance from "@/hooks/use-allowance";
import useAmount from "@/hooks/use-amount";
import useApprove from "@/hooks/use-approve";
import useSwapRate from "@/hooks/use-swap-rate";
import useToken from "@/hooks/use-token";
import dynamic from "next/dynamic";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const { amount, setAmount0, setAmount1, swapAmountValue } = useAmount();

      const { getAmountsOut, getAmountsIn } = useSwapRate(token0, token1, amount.amount0, amount.amount1);
      const { isAllowance: isToken0Allowance } = useAllowance(token0, amount.amount0);

      const handleApprove = useApprove(token0?.address, OCTA_V2_ROUTER_ADDRESS, amount.amount0 || getAmountsIn);

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
                  <Button className="mt-5 w-full" onClick={handleApprove}>
                    {isToken0Allowance ? "Swap" : "Approve"}
                  </Button>
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
