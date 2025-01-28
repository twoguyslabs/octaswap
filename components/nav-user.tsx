import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import WalletButton from "./wallet-button";
import { ModeToggle } from "./mode-toggle";
import ChainSelector from "./chain-selector";
import { useAccount } from "wagmi";

export function NavUser() {
  const { isConnected } = useAccount();
  const { state } = useSidebar();

  return (
    <SidebarMenu
      data-state={state}
      className="data-[state=collapsed]:gap-2 data-[state=expanded]:gap-0"
    >
      <SidebarMenuItem>
        <ModeToggle />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <WalletButton />
      </SidebarMenuItem>
      {isConnected && (
        <SidebarMenuItem>
          <ChainSelector />
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
