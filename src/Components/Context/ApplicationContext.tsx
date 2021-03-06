import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from "@azure/msal-react";
import { AuthPage, ErrorPage, UnauthorizePage } from "@page";
import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { error$ } from "@context-observable";
import { LoaderProvider, MessageBoxProvider, ModalProvider } from ".";

type ApplicationContextType = {
  username: string;
};

const ApplicationContext = createContext<ApplicationContextType>(
  {} as ApplicationContextType
);

const ApplicationProvider: FC = ({ children }) => {
  const [isUnAuth, setUnAuth] = useState(false)
  const [isInternalServerError, setInternalServerError] = useState(false)

  const { accounts } = useMsal();
  const username = useMemo(
    () => (accounts && accounts.length !== 0 ? accounts[0].username : ""),
    [accounts]
  );

  useEffect(() => {
    error$.subscribe(({ statusCode }) => {
      setUnAuth(statusCode === 401)
      setInternalServerError(statusCode === 500)
    })

    return () => {
      error$.unsubscribe()
    }
  }, [])

  if (isUnAuth) {
    return <UnauthorizePage />
  }

  if (isInternalServerError) {
    return <ErrorPage />
  }

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