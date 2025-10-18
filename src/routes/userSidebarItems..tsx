import { CalendarCheck } from "lucide-react"; // you can change this to any icon you like
import Bookings from "@/pages/User/Bookings";
import type { ISidebarItem } from "@/type";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        icon: CalendarCheck,
        component: Bookings,
      },
    ],
  },
];
