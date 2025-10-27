import { BarChart3, MapPin, PlaneTakeoff, Layers, ClipboardList, Users } from "lucide-react"; // import any icons you like
import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";
import ManageTours from "@/pages/Admin/ManageTours";
import ManageUsers from "@/pages/Admin/ManageUsers";
// import EditTour from "@/pages/Admin/EditTour";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        icon: Layers,
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        icon: MapPin,
        component: AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        icon: PlaneTakeoff,
        component: AddTour,
      },
      {
        title: "Manage Tours",
        url: "/admin/manage-tours",
        icon: ClipboardList,
        component: ManageTours,
      },
      // {
      //   title: "Edit Tour",
      //   url: "/admin/tours/edit/:id",
      //   icon: ClipboardList,
      //   component: EditTour,
      // }
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        icon: Users,
        component: ManageUsers,
      },
    ],
  },
];
