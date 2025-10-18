// import UserOverview from "@/pages/user/UserOverview";
import Bookings from "@/pages/User/Bookings";
import type { ISidebarItem } from "@/type";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
