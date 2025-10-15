import App from "@/App";
import About from "@/pages/About";
import AllTours from "@/pages/AllTours";
import Blogs from "@/pages/Blogs";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

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
]);
