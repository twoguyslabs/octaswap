"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Link from "next/link";

const Liquidity = dynamic(
  () =>
    Promise.resolve(function Liquidity() {
      return (
        <main className="grow">
          <div className="mx-auto min-h-full max-w-3xl px-4 sm:py-5 md:px-0">
            <div className="space-y-4">
              <Card>
                <CardContent className="py-3">
                  <CardHeader className="px-0 py-2">
                    <CardTitle className="text-lg">Liquidity Provider Rewards</CardTitle>
                  </CardHeader>
                  <p className="text-sm text-muted-foreground">
                    Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are
                    added to the pool, accrue in real time and can be claimed by withdrawing your liquidity
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://docs.uniswap.org/contracts/v2/concepts/core-concepts/pools"
                    className="text-sm underline"
                  >
                    Read more about providing liquidity
                  </Link>
                </CardFooter>
              </Card>
              <div className="text-right">
                <Button>Create a pair</Button>
              </div>
            </div>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Liquidity;
