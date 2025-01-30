"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { generateBreadcrumbs } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = dynamic(
  () =>
    Promise.resolve(function Sidebar({
      children,
    }: Readonly<{ children: React.ReactNode }>) {
      const pathname = usePathname();
      const breadcrumbs = generateBreadcrumbs(pathname);

      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {breadcrumbs.map((breadcrumb, index) => (
                      <BreadcrumbItem key={breadcrumb.href}>
                        {index < breadcrumbs.length - 1 ? (
                          <>
                            <BreadcrumbLink asChild>
                              <Link href={breadcrumb.href}>
                                {breadcrumb.label}
                              </Link>
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                          </>
                        ) : (
                          <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      );
    }),
  { ssr: false },
);

export default Sidebar;
