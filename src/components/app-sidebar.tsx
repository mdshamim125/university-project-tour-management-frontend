/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link, useNavigate } from "react-router";
import type { TRole } from "@/type";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const navigate = useNavigate();

  const data = {
    navMain: getSidebarItems(userInfo?.data?.role as TRole),
  };

  const handleGoHome = () => navigate("/");

  return (
    <Sidebar {...props}>
      <SidebarHeader onClick={handleGoHome} className="cursor-pointer">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {/* Sidebar groups (each section) */}
        {data.navMain.map((group: any) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: any) => {
                  const Icon = item.icon; //  dynamic Lucide icon
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className="flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        >
                          {/* Only render icon if it exists */}
                          {Icon && (
                            <Icon size={18} className="text-muted-foreground" />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
