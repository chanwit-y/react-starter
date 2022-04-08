import { createContext, FC, useContext, useEffect, useState } from "react";
import { LoaderTypeConstant } from "../../Lib/Constants";
import { LoaderType } from "../../@types/LoaderType";
import { load$ } from "../../Lib/Observable/load.obs";

type LoaderContextType = {
  isLoading: boolean;
};

const LoaderContext = createContext<LoaderContextType>({} as LoaderContextType);

const LoaderProvider: FC = ({ children }) => {
  const [loaderIds, setLoaderIds] = useState<string[]>([])

  useEffect(() => {
    load$.subscribe(({ loaderId, type }: LoaderType) => {
      setLoaderIds(state => {
        if (type === LoaderTypeConstant.Loaded) {
          return state.filter(id => id !== loaderId)
        }
        if (state.some(id => id === loaderId)) {
          return state
        }
        return state.concat(loaderId)
      })
    })
  }, [])

  return (
    <LoaderContext.Provider
      value={{
        isLoading: !!loaderIds.length
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
export const useLoader = () => useContext(LoaderContext);