import useAddress from "./use-address";
import useCreatePair from "./use-create-pair";
import { tokenClass } from "@/constants/token";
import { Route, Trade } from "@uniswap/v2-sdk";
import { CurrencyAmount, TradeType } from "@uniswap/sdk-core";

export default function useSwap(token0: Currency, token1: Currency, amount0: string, amount1: string) {
  const address = useAddress();
  const pair = useCreatePair(token0, token1);

  const tokenZero = tokenClass(token0);
  const tokenOne = tokenClass(token1);

  const amount = amount0 ? amount0 : amount1;

  const route = new Route([pair], tokenZero, tokenOne);

  const trade = new Trade(route, CurrencyAmount.fromRawAmount(tokenZero!, amount), TradeType.EXACT_INPUT);

  return "";
}
