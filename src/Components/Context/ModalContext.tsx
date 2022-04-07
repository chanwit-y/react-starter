import React, {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { TransitionsModal } from "../Common";

type DisplayModalProps = {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  component: JSX.Element;
  paddingClass?: string;
};
const DisplayModalFC: FC<DisplayModalProps> = ({
  title,
  open,
  setOpen,
  component,
}) => {
  return (
    <TransitionsModal
      title={title}
      open={open}
      setOpen={setOpen}
    >
      {component}
    </TransitionsModal>
  );
};

const DisplayModal = memo(DisplayModalFC);

type ModalContextType = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setTitleModal: Dispatch<SetStateAction<string>>;
  displayModal: (
    title: string,
    open: boolean,
    component: JSX.Element,
    paddingClass?: string
  ) => void;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

const ModalProvoider: FC = ({ children }) => {
  const [titleModal, setTitleModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [component, setComponent] = useState<JSX.Element>(<></>);

  const displayModal = useCallback(
    (
      title: string,
      open: boolean,
      component: JSX.Element,
    ) => {
      setTitleModal(title);
      setOpenModal(open);
      setComponent(component);
    },
    [titleModal, openModal, component]
  );

  return (
    <ModalContext.Provider
      value={{ displayModal, setOpenModal, setTitleModal }}
    >
      <DisplayModal
        title={titleModal}
        open={openModal}
        setOpen={setOpenModal}
        component={component}
      />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvoider;

export const useModal = () => useContext(ModalContext);
