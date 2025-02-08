import { numericValidation } from "@/lib/utils";
import { useCallback, useState } from "react";

export default function useAmount() {
  const [amount, setAmount] = useState({
    amount0: "",
    amount1: "",
  });

  const setAmount0 = (value: string) => {
    if (!numericValidation.test(value)) return;
    setAmount({ amount0: value, amount1: "" });
  };

  const setAmount1 = (value: string) => {
    if (!numericValidation.test(value)) return;
    setAmount({ amount1: value, amount0: "" });
  };

  const swapAmountValue = () => {
    setAmount({ amount0: amount.amount1, amount1: amount.amount0 });
  };

  const resetAmount = useCallback(() => setAmount({ amount0: "", amount1: "" }), []);

  return { amount, setAmount0, setAmount1, swapAmountValue, resetAmount };
}
