import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import AllTours from "@/pages/AllTours";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import type { TRole } from "@/type";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems.";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "blogs",
        Component: Blogs,
      },
      {
        path: "tours",
        Component: AllTours,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/verify",
    Component: Verify,
  },
  // {
  //   Component: withAuth(DashboardLayout, role.super_admin as TRole),
  //   path: "/admin",
  //   children: [
  //     { index: true, element: <Navigate to="/admin/analytics" /> },
  //     ...generateRoutes(adminSidebarItems),
  //   ],
  // },
  {
    Component: withAuth(DashboardLayout, [
      role.super_admin,
      role.admin,
    ] as TRole[]),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
]);
