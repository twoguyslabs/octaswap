import * as React from "react";
import { BookOpen, Code, ExternalLink, Share2 } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavMisc } from "@/components/nav-misc";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Logo from "./logo";

const data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: Code,
      isActive: true,
      items: [
        {
          title: "Swap",
          url: "/",
        },
        {
          title: "Liquidity",
          url: "/liquidity",
        },
        {
          title: "Staking",
          url: "/staking",
        },
        {
          title: "Launchpad",
          url: "https://launchpad.octaswap.io",
        },
      ],
    },
    {
      title: "Socials",
      url: "#",
      icon: Share2,
      isActive: true,
      items: [
        {
          title: "Twitter",
          url: "#",
        },
        {
          title: "Telegram",
          url: "#",
        },
        {
          title: "Discord",
          url: "#",
        },
      ],
    },
  ],
  misc: [
    {
      name: "Whitepaper",
      url: "#",
      icon: BookOpen,
    },
    {
      name: "Octa Bridge",
      url: "#",
      icon: ExternalLink,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMisc misc={data.misc} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
