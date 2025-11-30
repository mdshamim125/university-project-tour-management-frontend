import { CalendarCheck, User } from "lucide-react"; // you can change this to any icon you like
import type { ISidebarItem } from "@/types";
import MyBookings from "@/pages/User/MyBookings";
import MyProfile from "@/MyProfile";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "My Bookings",
        url: "/user/my-bookings",
        icon: CalendarCheck,
        component: MyBookings,
      },
      {
        title: "My Profile",
        url: "/user/my-profile",
        icon: User,
        component: MyProfile,
      },
    ],
  },
];
