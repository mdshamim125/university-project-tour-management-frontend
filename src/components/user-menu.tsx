/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpenIcon, LogInIcon, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router";

export default function UserMenu() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [logOut] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log("user info:", userInfo);

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const name = userInfo?.data?.name || "";
  const nameLetter = name
    .split(" ")
    .map((word: any) => word[0])
    .join("");

  console.log(nameLetter);

  const handleDashboardRedirect = () => {
    if (
      userInfo?.data?.role === "ADMIN" ||
      userInfo?.data?.role === "SUPER_ADMIN"
    ) {
      navigate("/admin");
    } else if (userInfo?.data?.role === "USER") {
      navigate("/user"); // default user dashboard
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>{nameLetter || "JD"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {userInfo?.data?.name || "John Doe"}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {userInfo?.data?.email || "johndoe@gmail.com"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userInfo?.data?.email && (
            <DropdownMenuItem onClick={handleDashboardRedirect}>
              <BookOpenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {userInfo?.data?.email && (
            <div className="flex items-center gap-2" onClick={handleLogout}>
              <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Logout</span>
            </div>
          )}
          {!userInfo?.data?.email && (
            <div className="flex items-center gap-2" onClick={handleLogin}>
              <LogInIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Login</span>
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
