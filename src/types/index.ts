import type { role } from "@/constants/role";
import type { ComponentType } from "react";
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    icon: ComponentType;
    component: ComponentType;
  }[];
}

export type TRole = keyof typeof role | (typeof role)[keyof typeof role];

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN" | string;
  isActive: "ACTIVE" | "INACTIVE" | "BLOCKED" | string;
  isVerified?: boolean;
};
