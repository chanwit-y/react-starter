import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from "react-query";

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


export type QueryServiceType<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  queryKey: TQueryKey;
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >;
};