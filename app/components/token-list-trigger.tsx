import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import Image from "next/image";

export default function TokenListTrigger({
  token,
  elementRef,
}: {
  token: UnionToken | undefined;
  elementRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <DialogTrigger asChild>
      <Button ref={elementRef} variant="outline" className="absolute inset-y-1/2 right-4 -translate-y-1/2 px-2">
        {token?.chainId ? (
          token.logoURI ? (
            <>
              <Image
                src={token.logoURI}
                alt={`${token.name} Logo`}
                width={100}
                height={100}
                quality={100}
                priority
                className="h-7 w-7"
              />
              <span className="text-xl font-bold">{token.symbol}</span>
            </>
          ) : (
            <>
              <CircleHelp style={{ width: "1.75rem", height: "1.75rem" }} />
              <span className="text-xl font-bold">{token.symbol}</span>
            </>
          )
        ) : (
          <span className="text-xl font-bold">Select token</span>
        )}
      </Button>
    </DialogTrigger>
  );
}
