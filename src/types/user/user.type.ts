export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN" | string;
  picture?: string;
  isDeleted: boolean;
  isActive: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isVerified: boolean;
  auths: IAuthProvider[];
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponseWithMeta<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta: IMeta;
}
