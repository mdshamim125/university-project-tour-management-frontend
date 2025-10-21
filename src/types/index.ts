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

type ErrorSource = {
  path: string;
  message: string;
};

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

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

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponseWithMeta<T> {
  data: T;
  meta: IMeta;
  message: string;
  success: boolean;
}

export interface ITourPackageResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  departureLocation: string;
  arrivalLocation: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  division: string[];
  tourType: string[];
  createdAt: string;
  updatedAt: string;
}

// export interface ITourPackageResponse {
//   data: ITourPackage[];
//   meta: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPage: number;
//   };
// }
