import type { TRole } from "@/type";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { role } from "@/constants/role";
import { userSidebarItems } from "@/routes/userSidebarItems.";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
    case role.super_admin:
      return [...adminSidebarItems];

    case role.user:
      return [...userSidebarItems];

    default:
      return [];
  }
};
