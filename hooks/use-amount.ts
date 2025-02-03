import { useState } from "react";

export default function useAmount() {
  const [amount, setAmount] = useState({
    amount0: "",
    amount1: "",
  });

  const setAmount0 = (value: string) => {
    setAmount({ amount0: value, amount1: "" });
  };

  const setAmount1 = (value: string) => {
    setAmount({ amount1: value, amount0: "" });
  };

  return { amount, setAmount0, setAmount1 };
}
