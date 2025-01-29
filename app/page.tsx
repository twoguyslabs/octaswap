"use client";

import SwapInput from "@/components/swap-input";
import SwapTokenPlace from "@/components/swap-token-place";
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";
import dynamic from "next/dynamic";

const Swap = dynamic(
  () =>
    Promise.resolve(function Swap() {
      return (
        <main className="px-4">
          <div className="space-y-2">
            <div className="text-right">
              <button>
                <Settings size={20} />
              </button>
            </div>
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
