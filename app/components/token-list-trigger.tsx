import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function TokenListTrigger({
  token,
}: {
  token: Token | undefined;
}) {
  return (
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="absolute inset-y-1/2 right-4 -translate-y-1/2"
      >
        {token?.chainId ? (
          <>
            <Image
              src={token.logoURL}
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
          <span className="text-xl font-bold">Select token</span>
        )}
      </Button>
    </DialogTrigger>
  );
}
