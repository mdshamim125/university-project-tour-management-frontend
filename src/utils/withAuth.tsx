import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { Navigate } from "react-router";
import type { ComponentType } from "react";

export const withAuth = (
  Component: ComponentType,
  requiredRole?: TRole | TRole[]
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const userRole = data?.data?.role;

    // Redirect if user not logged in
    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    // Check roles only when user data is ready
    if (!isLoading && requiredRole) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];

      // If user role is not one of the allowed ones → unauthorized
      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
      }
    }

    return <Component />;
  };
};
