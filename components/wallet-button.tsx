import { useAccount } from "wagmi";
import { SidebarMenuButton } from "./ui/sidebar";
import { Wallet } from "lucide-react";
import { useAppKit } from "@reown/appkit/react";

export default function WalletButton() {
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();

  const formattedAddress = address?.slice(0, 6) + "..." + address?.slice(-6);

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      onClick={() =>
        isConnected ? open({ view: "Account" }) : open({ view: "Connect" })
      }
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
        <Wallet size={18} />
      </div>
      <div>
        <span className="font-semibold">
          {isConnected ? formattedAddress : "Connect Wallet"}
        </span>
      </div>
    </SidebarMenuButton>
  );
}
