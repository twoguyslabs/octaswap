"use client";

import SwapInput from "@/app/components/swap-input";
import SwapSettings from "@/app/components/swap-settings";
import SwapTokenPlace from "@/app/components/swap-token-place";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useToken from "@/hooks/use-token";
import dynamic from "next/dynamic";
import { useState } from "react";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      const [token0, setToken0] = useToken({ useNative: true });
      const [token1, setToken1] = useToken({ useNative: false });

      const [amount0, setAmount0] = useState("");
      const [amount1, setAmount1] = useState("");

      return (
        <main>
          <div className="mx-auto max-w-[30rem] px-4 sm:pt-10 md:px-0">
            <div className="space-y-2">
              <SwapSettings />
              <Card>
                <CardContent className="px-4 py-5">
                  <SwapInput
                    token={token0}
                    onSetToken={setToken0}
                    amount={amount0}
                    onSetAmount={setAmount0}
                  />
                  <SwapTokenPlace
                    token0={token0}
                    token1={token1}
                    onSetToken0={setToken0}
                    onSetToken1={setToken1}
                  />
                  <SwapInput
                    token={token1}
                    onSetToken={setToken1}
                    amount={amount1}
                    onSetAmount={setAmount1}
                  />
                  <Button className="mt-5 w-full">Swap</Button>
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
