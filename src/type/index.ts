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
    component: ComponentType;
  }[];
}

export type TRole = keyof typeof role | (typeof role)[keyof typeof role];

export type BorrowStatus = "borrowed" | "returned";

// Frontend version of Borrow
export interface IBorrow {
  _id?: string; // borrow record ID
  userId: string; // user ID as string
  bookId: string; // book ID as string
  quantity: number;
  status: BorrowStatus;
  dueDate: string; // ISO date string
  returnedAt?: string; // ISO date string, optional
  createdAt?: string; // ISO date string, optional
  updatedAt?: string; // ISO date string, optional
}

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN" | string;
  isActive: "ACTIVE" | "INACTIVE" | "BLOCKED" | string;
  isVerified?: boolean;
};
