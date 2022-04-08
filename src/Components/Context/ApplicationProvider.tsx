import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from "@azure/msal-react";
import { AuthPage } from "context-page";
import { createContext, FC, useContext, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import LoaderProvider from "./LoaderProvider";
import MessageBoxProvider from "./MessageBoxProvider";
import ModalProvider from "./ModalContext";

type ApplicationContextType = {
  username: string;
};
const ApplicationContext = createContext<ApplicationContextType>(
  {} as ApplicationContextType
);

const ApplicationProvider: FC = ({ children }) => {
  const { accounts } = useMsal();
  const username = useMemo(
    () => (accounts && accounts.length !== 0 ? accounts[0].username : ""),
    [accounts]
  );

  return (
    <ApplicationContext.Provider value={{ username }}>
      <LoaderProvider>
        <ModalProvider>
          <MessageBoxProvider>
            <AuthenticatedTemplate>
              {accounts && accounts.length !== 0 && children}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <Routes>
                <Route path="/" element={<AuthPage />} />
              </Routes>
            </UnauthenticatedTemplate>
          </MessageBoxProvider>
        </ModalProvider>
      </LoaderProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
export const useApplication = () => useContext(ApplicationContext);