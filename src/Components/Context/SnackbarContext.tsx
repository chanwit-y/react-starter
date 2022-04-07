import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { AlertType } from "../../@types/SnackbarType";
import {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useContext,
  useState,
} from "react";

type Props = {
  open: boolean;
  message: string;
  alertType: AlertType;
  handleClose?: () => void;
};

const DisplaySnackbarFC: FC<Props> = ({
  open,
  message,
  alertType,
  handleClose,
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const DisplaySnackbar = memo(DisplaySnackbarFC);

type SnackbarContextType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  displaySnackbar: (
    message: string,
    alertType: AlertType,
    open?: boolean
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType
);

const SnackbarProvoider: FC = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState(AlertType.INFO);

  const displaySnackbar = useCallback(
    (message: string, alertType: AlertType, open?: boolean) => {
      setMessage(message);
      setOpen(open ?? true);
      setAlertType(alertType);
    },
    [message, open]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ displaySnackbar, setOpen }}>
      <DisplaySnackbar
        handleClose={handleClose}
        open={open}
        alertType={alertType}
        message={message}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvoider;

export const useSnackbar = () => useContext(SnackbarContext);
