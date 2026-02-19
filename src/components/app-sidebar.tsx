// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import Logo from "@/assets/icons/Logo";
// import { Link, useNavigate } from "react-router";
// import type { TRole } from "@/types";
// import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
// import { getSidebarItems } from "@/utils/getSidebarItems";

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { data: userInfo } = useUserInfoQuery(undefined);
//   const navigate = useNavigate();

//   const data = {
//     navMain: getSidebarItems(userInfo?.data?.role as TRole),
//   };

//   const handleGoHome = () => navigate("/");

//   return (
//     <Sidebar {...props}>
//       <SidebarHeader onClick={handleGoHome} className="cursor-pointer">
//         <Logo />
//       </SidebarHeader>

//       <SidebarContent>
//         {/* Sidebar groups (each section) */}
//         {data.navMain.map((group: any) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item: any) => {
//                   const Icon = item.icon; //  dynamic Lucide icon
//                   return (
//                     <SidebarMenuItem key={item.title}>
//                       <SidebarMenuButton asChild>
//                         <Link
//                           to={item.url}
//                           className="flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
//                         >
//                           {/* Only render icon if it exists */}
//                           {Icon && (
//                             <Icon size={18} className="text-muted-foreground" />
//                           )}
//                           <span>{item.title}</span>
//                         </Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   );
//                 })}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>

//       <SidebarRail />
//     </Sidebar>
//   );
// }


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
import { LogOutIcon } from "lucide-react";
import { useUserInfoQuery, useLogOutMutation, authApi } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { getSidebarItems } from "@/utils/getSidebarItems";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();

  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  const handleGoHome = () => navigate("/");

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate("/login"); // redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader onClick={handleGoHome} className="cursor-pointer">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {/* Sidebar groups */}
        {data.navMain.map((group: any) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: any) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className="flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        >
                          {Icon && <Icon size={18} className="text-muted-foreground" />}
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

        {/* Logout button at the bottom */}
        <div className="mt-auto mb-4 px-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            <LogOutIcon size={16} />
            <span>Logout</span>
          </button>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
