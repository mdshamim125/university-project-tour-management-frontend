import { CalendarCheck } from "lucide-react"; // you can change this to any icon you like
import type { ISidebarItem } from "@/types";
import MyBookings from "@/pages/User/MyBookings";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/my-bookings",
        icon: CalendarCheck,
        component: MyBookings,
      },
    ],
  },
];
