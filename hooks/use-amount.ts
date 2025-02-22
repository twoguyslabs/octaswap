import { numericValidation } from "@/lib/utils";
import { useCallback, useState } from "react";
import usePairAddress from "./use-pair-address";

export default function useAmount(t0: UnionToken | undefined, t1: UnionToken | undefined) {
  const { isPairExist } = usePairAddress(t0, t1);

  const [amount, setAmount] = useState({
    amount0: "",
    amount1: "",
  });

  const setAmount0 = (value: string) => {
    if (!numericValidation.test(value)) return;
    setAmount({ amount0: value, amount1: !isPairExist ? amount.amount1 : "" });
  };

  const setAmount1 = (value: string) => {
    if (!numericValidation.test(value)) return;
    setAmount({ amount0: !isPairExist ? amount.amount0 : "", amount1: value });
  };

  const swapAmountValue = () => {
    setAmount({ amount0: amount.amount1, amount1: amount.amount0 });
  };

  const resetAmount = useCallback(() => setAmount({ amount0: "", amount1: "" }), []);

  return { amount, setAmount0, setAmount1, swapAmountValue, resetAmount };
}
