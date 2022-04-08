export interface IResponse<T> {
  data: T;
  errors: any;
  status: boolean;
}

export type ResponseResult<T> = {
  data: T;
  message: string;
  error: any;
  offset: number;
  limit: number;
  total: number;
};
