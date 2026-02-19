/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useLocation, Link, useNavigate } from "react-router";
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
import { LogOutIcon } from "lucide-react";
import Logo from "@/assets/icons/Logo";
import {
  useUserInfoQuery,
  useLogOutMutation,
  authApi,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { cn } from "@/lib/utils"; // shadcn/ui cn utility (for class merging)

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation(); // ← to detect active route
  const [logOut] = useLogOutMutation();

  const navMain = getSidebarItems(userInfo?.data?.role);

  const handleGoHome = () => navigate("/");

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar {...props} className="border-r bg-card">
      <SidebarHeader
        onClick={handleGoHome}
        className="cursor-pointer p-4 border-b"
      >
        <Logo />
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto py-4">
          {navMain.map((group: any) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item: any) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            "w-full justify-start gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <Link to={item.url}>
                            {Icon && (
                              <Icon
                                size={18}
                                className={cn(
                                  "flex-shrink-0",
                                  isActive
                                    ? "text-primary"
                                    : "text-muted-foreground",
                                )}
                              />
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
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto border-t p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOutIcon size={18} />
            <span>Logout</span>
          </button>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
