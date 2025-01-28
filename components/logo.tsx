import Image from "next/image";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import ocsLogo from "@/assets/ocs-logo.svg";
import Link from "next/link";

export default function Logo() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link href="https://octaswap.io">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image
                src={ocsLogo}
                alt="OctaSwap Logo"
                width={0}
                height={0}
                data-state={state}
                className="data-[state=expanded]:!w-6 data-[state=collapsed]:!w-5"
              />
            </div>
            <div className="text-lg font-bold">OctaSwap</div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
