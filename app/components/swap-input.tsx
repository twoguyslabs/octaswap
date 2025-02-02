import { Input } from "../../components/ui/input";
import { Dispatch, SetStateAction } from "react";
import TokenListWrapper from "./token-list-wrapper";
import SwapBalance from "./swap-balance";

export default function SwapInput({
  token,
  onSetToken,
  amount,
  onSetAmount,
}: {
  token: Token | undefined;
  onSetToken: Dispatch<SetStateAction<Token | undefined>>;
  amount: string;
  onSetAmount: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div>From</div>
        <SwapBalance token={token} onSetAmount={onSetAmount} />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="0.00"
          className="h-20 pr-32 text-2xl font-bold placeholder:text-2xl md:text-2xl"
          value={amount}
          onChange={(e) => onSetAmount(e.target.value)}
        />
        <TokenListWrapper token={token} onSetToken={onSetToken} />
      </div>
    </div>
  );
}
