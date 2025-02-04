import useTokenBalance from "@/hooks/use-token-balance";
import { formatStringAmount } from "@/lib/utils";
import { BiSolidWalletAlt } from "react-icons/bi";
import { formatUnits } from "viem";

export default function SwapBalance({
  token,
  onSetAmount,
}: {
  token: UnionToken;
  onSetAmount: (value: string) => void;
}) {
  const balance = useTokenBalance(token);
  const stringBalance = balance ? formatUnits(balance, 18) : "0";
  const formattedBalance = formatStringAmount(stringBalance);

  return (
    <button className="flex items-center gap-x-1" onClick={() => onSetAmount(stringBalance)}>
      <div>{formattedBalance}</div>
      <BiSolidWalletAlt size={15} />
    </button>
  );
}
