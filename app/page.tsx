"use client";

import SwapInput from "@/components/swap-input";
import SwapSettings from "@/components/swap-settings";
import SwapTokenPlace from "@/components/swap-token-place";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      return (
        <main className="px-4">
          <div className="space-y-2">
            <SwapSettings />
            <Card>
              <CardContent className="px-4 py-5">
                <SwapInput />
                <SwapTokenPlace />
                <SwapInput />
              </CardContent>
            </Card>
          </div>
        </main>
      );
    }),
  { ssr: false },
);

export default Swap;
