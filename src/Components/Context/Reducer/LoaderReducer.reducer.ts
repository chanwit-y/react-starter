import { IAction } from "../../../@types/ActionType";

export enum LoaderActionType {
  SET,
}

export type LoaderStateType = {
  loading?: boolean;
  actionStack: string[];
};

export const initialState: LoaderStateType = {
  loading: false,
  actionStack: [],
};

const LoaderReducer = (
  state: LoaderStateType,
  action: IAction<LoaderActionType, Partial<LoaderStateType>>
) => {
  switch (action.type) {
    case LoaderActionType.SET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default LoaderReducer;
