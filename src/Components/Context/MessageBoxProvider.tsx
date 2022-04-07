import { Box, Button } from "@mui/material";
import { isEmpty } from "lodash";
import React, {
  createContext,
  FC,
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { MessageBoxType } from "../../@types/MessageBoxType";
import {
  PrimaryButton,
  RemoveButton,
  TextField,
  TransitionsModal,
} from "../../Components/Common";
import { Title } from "../Common/Title";

import MessageBoxReducer, {
  MessageBoxActionType,
} from "./Reducer/MessageBox.reducer";

type ContextType = {
  displayMessageBox: (
    title: string,
    description: string,
    type: MessageBoxType,
    open: boolean,
    callback?: (isConfirm: boolean, comment?: string) => void,
    confirmButtonText?: string,
    closeButtonText?: string,
    commentIsRequired?: boolean,
    commentRequiredHelperText?: string
  ) => void;
};

const MessageBoxContext = createContext<ContextType>({} as ContextType);

type Props = {};

const MessageBoxProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(MessageBoxReducer, { test: "" });

  const [titleBox, setTitleBox] = useState("");
  const [descriptionBox, setDescriptionBox] = useState("");
  const [comment, setComment] = useState("");

  const [typeBox, setTypeBox] = useState<MessageBoxType>(
    MessageBoxType.Information
  );
  const [openBox, setOpenBox] = useState(false);
  const [confirmButtonTextBox, setConfirmButtonTextBox] = useState<string>();
  const [closeButtonTextBox, setCloseButtonTextBox] = useState<string>();
  const [commentIsRequired, setCommentIsRequired] = useState<boolean>();
  const [commentRequiredHelperText, setCommentRequiredHelperText] =
    useState<string>();

  useEffect(() => {
    // console.log(descriptionBox);
  }, [descriptionBox]);

  const displayMessageBox = (
    title: string,
    description: string,
    type: MessageBoxType,
    open: boolean,
    callback?: (isConfirm: boolean, comment?: string) => void,
    confirmButtonText?: string,
    closeButtonText?: string,
    commentIsRequired?: boolean,
    commentRequiredHelperText?: string
  ) => {
    setTitleBox(title);
    setDescriptionBox(description);
    setTypeBox(type);
    setOpenBox(open);
    setConfirmButtonTextBox(confirmButtonText);
    setCloseButtonTextBox(closeButtonText);
    setCommentIsRequired(commentIsRequired);
    setCommentRequiredHelperText(commentRequiredHelperText);

    callback &&
      dispatch({
        type: MessageBoxActionType.SET,
        payload: { ...state, callback },
      });
  };

  const messageBox = useMemo(
    () => (
      <TransitionsModal
        title={!isEmpty(titleBox) ? titleBox : typeBox.toString()}
        open={openBox}
        setOpen={setOpenBox}
      >
        <Box p={2}>
          <Box display="flex">
            <Title text={descriptionBox} />
          </Box>

          {typeBox === MessageBoxType.OperationWithComment && (
            <Box my={1}>
              <TextField
                name="comment"
                fullWidth={true}
                multiline={true}
                value={comment}
                required={commentIsRequired}
                requiredHelperText={commentRequiredHelperText}
                onChange={(e) => setComment(e.target.value)}
              />
            </Box>
          )}

          <Box display="flex" justifyContent="end" pt={2}>
            {typeBox === MessageBoxType.Discard && (
              <Button
                onClick={() => {
                  state.callback && state.callback(true);
                  setOpenBox(false);
                }}
                // className="w-32 bg-white"
                variant="contained"
                disableElevation
                sx={{ marginRight: 2 }}
              >
                Discard
              </Button>
            )}
            {typeBox !== MessageBoxType.ConfirmWithoutClose &&
              typeBox !== MessageBoxType.Information &&
              typeBox !== MessageBoxType.DeleteWithoutClose && (
                <Button
                  onClick={() => setOpenBox(false)}
                  // className="w-32 bg-white"
                  sx={{
                    width: 120,
                    marginRight: 1,
                  }}
                  color="inherit"
                  variant="outlined"
                  // color="secondary"
                >
                  {!isEmpty(closeButtonTextBox) ? closeButtonTextBox : "Close"}
                </Button>
              )}
            {(typeBox === MessageBoxType.Confirm ||
              typeBox === MessageBoxType.Information ||
              typeBox === MessageBoxType.OperationWithComment ||
              typeBox === MessageBoxType.ConfirmWithoutClose) && (
              <PrimaryButton
                onClick={() => {
                  state.callback && state.callback(true, comment);
                  setOpenBox(false);
                }}
                disabled={commentIsRequired && comment === ""}
                // className="w-32 bg-white"
                // variant="contained"
                // disableElevation
                // sx={{ marginLeft: 2, marginRight: 2 }}
                text={confirmButtonTextBox ? confirmButtonTextBox : "OK"}
              />
            )}
            {(typeBox === MessageBoxType.Delete ||
              typeBox === MessageBoxType.DeleteWithoutClose) && (
              <RemoveButton
                color="error"
                onClick={() => {
                  state.callback && state.callback(true, comment);
                  setOpenBox(false);
                }}
                disabled={commentIsRequired && comment === ""}
                text={confirmButtonTextBox ? confirmButtonTextBox : "OK"}
              />
            )}
          </Box>
        </Box>
      </TransitionsModal>
    ),
    [descriptionBox, typeBox, openBox, state.callback, comment]
  );

  return (
    <MessageBoxContext.Provider value={{ displayMessageBox }}>
      <Fragment>
        {messageBox}
        {children}
      </Fragment>
    </MessageBoxContext.Provider>
  );
};

export default MessageBoxProvider;
export const useMessageBox = () => useContext(MessageBoxContext);
