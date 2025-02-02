import { Input } from "../../components/ui/input";
import { Dispatch, SetStateAction } from "react";
import TokenListWrapper from "./token-list-wrapper";
import SwapBalance from "./swap-balance";

export default function SwapInput({
  token,
  onSetToken,
}: {
  token: Token | undefined;
  onSetToken: Dispatch<SetStateAction<Token | undefined>>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div>From</div>
        <SwapBalance token={token} />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="0.00"
          className="h-20 pr-32 text-2xl font-bold placeholder:text-2xl md:text-2xl"
        />
        <TokenListWrapper token={token} onSetToken={onSetToken} />
      </div>
    </div>
  );
}
