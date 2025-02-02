"use client";

import SwapInput from "@/app/components/swap-input";
import SwapSettings from "@/app/components/swap-settings";
import SwapTokenPlace from "@/app/components/swap-token-place";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useState } from "react";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      const [token0, setToken0] = useState({
        name: "Ethereum",
        symbol: "ETH",
        logo: "/eth-logo.png",
      });

      const [token1, setToken1] = useState({
        name: "Binance Smart Chain",
        symbol: "BNB",
        logo: "/bnb-logo.svg",
      });

      return (
        <main>
          <div className="mx-auto max-w-[30rem] px-4 sm:pt-10 md:px-0">
            <div className="space-y-2">
              <SwapSettings />
              <Card>
                <CardContent className="px-4 py-5">
                  <SwapInput token={token0} />
                  <SwapTokenPlace
                    token0={token0}
                    token1={token1}
                    onSetToken0={setToken0}
                    onSetToken1={setToken1}
                  />
                  <SwapInput token={token1} />
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
