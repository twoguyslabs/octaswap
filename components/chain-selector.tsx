import { useAccount } from "wagmi";
import { SidebarMenuButton } from "./ui/sidebar";
import { useAppKit } from "@reown/appkit/react";
import { getLogoByChainId } from "@/lib/chain-logos";
import Image from "next/image";

export default function ChainSelector() {
  const { chain } = useAccount();
  const { open } = useAppKit();

  const chainLogo = getLogoByChainId(chain?.id);

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      onClick={() => open({ view: "Networks" })}
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
        {chainLogo && (
          <Image
            src={chainLogo}
            alt={`${chain?.name} Logo`}
            width={25}
            height={25}
          />
        )}
      </div>
      <div>
        <span className="font-semibold text-base">{chain?.name}</span>
      </div>
    </SidebarMenuButton>
  );
}
