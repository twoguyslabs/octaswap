import { RefreshCcw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";

export default function SwapTokenPlace({
  token0,
  token1,
  onSetToken0,
  onSetToken1,
  onSwapAmountValue,
}: {
  token0: UnionToken | undefined;
  token1: UnionToken | undefined;
  onSetToken0: Dispatch<SetStateAction<UnionToken | undefined>>;
  onSetToken1: Dispatch<SetStateAction<UnionToken | undefined>>;
  onSwapAmountValue: () => void;
}) {
  const swapTokenPlace = () => {
    onSetToken0(token1);
    onSetToken1(token0);
  };

  const [isRotated, setIsRotated] = useState(false);
  const toggleRotation = () => setIsRotated(!isRotated);

  const onClick = () => {
    swapTokenPlace();
    toggleRotation();
    onSwapAmountValue();
  };
  return (
    <div className="relative">
      <Separator orientation="horizontal" className="mb-9 mt-14" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button variant="outline" size="icon" onClick={() => onClick()}>
          <RefreshCcw className={cn("transform transition duration-300 ease-in-out", isRotated ? "rotate-180" : "")} />
        </Button>
      </div>
    </div>
  );
}
