import React, { Dispatch, SetStateAction } from "react";
import TokenListWrapper from "./token-list-wrapper";
import SwapBalance from "./swap-balance";
import SwapInput from "./swap-input";
import useElementWidth from "@/hooks/use-element-width";

export default function DexBox({
  label,
  token,
  onSetToken,
  amount,
  onSetAmount,
  tokenBalance,
  rateAmounts,
}: {
  label: string;
  token: UnionToken | undefined;
  onSetToken: Dispatch<SetStateAction<UnionToken | undefined>>;
  amount: string;
  onSetAmount: (value: string) => void;
  tokenBalance: bigint | undefined;
  rateAmounts: bigint | undefined;
}) {
  const { elementRef, elementWidth } = useElementWidth();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div>{label}</div>
        <SwapBalance balance={tokenBalance} onSetAmount={onSetAmount} />
      </div>
      <div className="relative">
        <SwapInput amount={amount} onSetAmount={onSetAmount} rateAmounts={rateAmounts} elementWidth={elementWidth} />
        <TokenListWrapper
          token={token}
          onSetToken={onSetToken}
          elementRef={elementRef as React.RefObject<HTMLButtonElement | null>}
        />
      </div>
    </div>
  );
}
