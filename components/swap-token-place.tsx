import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SwapTokenPlace() {
  const [isRotated, setIsRotated] = useState(false);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };
  return (
    <div className="relative">
      <Separator orientation="horizontal" className="mb-9 mt-14" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button variant="outline" size="icon" onClick={toggleRotation}>
          <RefreshCcw
            className={cn(
              "transform transition duration-300 ease-in-out",
              isRotated ? "rotate-180" : "",
            )}
          />
        </Button>
      </div>
    </div>
  );
}
