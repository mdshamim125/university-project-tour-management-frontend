import type { TRole } from "@/type";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems.";
import { role } from "@/constants/role";

export const getSidebarItems = (userRole: TRole) => {
  //custom for preventing error

  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
