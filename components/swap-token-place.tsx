import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function SwapTokenPlace() {
  return (
    <div className="relative">
      <Separator orientation="horizontal" className="my-10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button variant="outline" size="icon">
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}
