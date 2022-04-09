import { IAction } from "@reducer-types";

export type MessageBoxState = {
  test: string;
  callback?: (isConfirm: boolean, comment?: string) => void;
};

export enum MessageBoxActionType {
  SET,
}

const MessageBoxReducer = (
  state: MessageBoxState,
  action: IAction<MessageBoxActionType, MessageBoxState>
) => {
  switch (action.type) {
    case MessageBoxActionType.SET: {
      return {
        ...state,
        callback: action.payload.callback,
      };
    }
    default:
      return state;
  }
};

export default MessageBoxReducer;
