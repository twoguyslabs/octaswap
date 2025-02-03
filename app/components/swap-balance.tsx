import useTokenBalance from "@/hooks/use-token-balance";
import { hasDecimal } from "@/lib/utils";
import { BiSolidWalletAlt } from "react-icons/bi";
import { formatUnits } from "viem";

export default function SwapBalance({
  token,
  onSetAmount,
}: {
  token: Token | undefined;
  onSetAmount: (value: string) => void;
}) {
  const balance = useTokenBalance(token);
  const stringBalance = balance ? formatUnits(balance, 18) : "0";
  const formattedBalance = hasDecimal(stringBalance)
    ? Number(stringBalance).toFixed(4)
    : stringBalance;

  return (
    <button
      className="flex items-center gap-x-1"
      onClick={() => onSetAmount(stringBalance)}
    >
      <div>{formattedBalance}</div>
      <BiSolidWalletAlt size={15} />
    </button>
  );
}
