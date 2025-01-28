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
          url: "https://x.com/Octa_Swap",
        },
        {
          title: "Telegram",
          url: "https://t.me/Octa_Swap",
        },
        {
          title: "Discord",
          url: "https://discord.gg/R4C8qjJavK",
        },
      ],
    },
  ],
  misc: [
    {
      name: "Whitepaper",
      url: "https://up5ojfu58o0vkn52.public.blob.vercel-storage.com/docs/OctaSwap%20Whitepaper.pdf",
      icon: BookOpen,
    },
    {
      name: "Octa Bridge",
      url: "https://bridge.octa.space/",
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
