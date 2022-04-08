import { createContext, FC, useContext, useReducer } from "react";
import LoaderReducer, { initialState, LoaderActionType } from "./Reducer/LoaderReducer.reducer";

type LoaderContextType = {
  setLoading: Function;
};

const LoaderContext = createContext<LoaderContextType>({} as LoaderContextType);

const LoaderProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(LoaderReducer, initialState);

  const setLoading = (isLoading: boolean, processName: string) => {
    let actionList = [...state.actionStack];
    if (isLoading) {
      actionList = [...actionList, processName];
    } else {
      const index = actionList.findIndex(
        (actionName) => actionName === processName
      );
      actionList.splice(index, 1);
      isLoading = actionList.length !== 0;
    }
    dispatch({
      type: LoaderActionType.SET,
      payload: {
        loading: isLoading,
        actionStack: actionList,
      }
    })
  };

  const setLoadingAction = async (action?: Function) => {
    const actionId = String(Date.now())
    setLoading(true, actionId);
    action && await action();
    setLoading(false, actionId);
  }

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
export const useLoader = () => useContext(LoaderContext);
