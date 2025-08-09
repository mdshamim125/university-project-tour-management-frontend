
export interface IResponse<T>{
    status: string;
    success: boolean;
    message: string;
    data: T;
    
}