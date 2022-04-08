import { useQuery } from "react-query";

export const useQueryService = ({
  key,
  callback,
  options = {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: false,
  },
}: any) => {
  return useQuery(key, callback, options);
};
