import {
  useQuery,
} from "react-query";
import { QueryServiceType } from "src/@types/ServiceType";

export const useQueryService = <T>({
  queryKey,
  queryFn,
  options = {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: false,
  },
}: QueryServiceType<T>) => {
  return useQuery<T, unknown, T, any>(queryKey, queryFn, options);
};
