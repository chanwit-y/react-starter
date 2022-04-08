import {
  createContext,
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { UserProfile } from "@dto";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "context-page";
import { useQueryService } from "context-hook/useQueryService";
import userService from "context-service/UserProfile.service";

export enum AppMode {
  User,
  Admin,
}

type AuthContextType = {
  userProfile?: UserProfile;
  setUserProfile: Function;
  selectedRole?: string;
  roles?: string[];
  onSelectRole: (role: string) => void;
  appMode: AppMode;
  setAppMode: Dispatch<SetStateAction<AppMode>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FC = ({ children }) => {
  const { accounts } = useMsal();
  const {data, refetch} = useQueryService(userService.getByEmail(accounts[0].username || ""));

  useEffect(() => {
    if(accounts[0].username) refetch();
  }, [accounts])

  useEffect(() => {
  console.log(data)
  }, [data])

  return (
    <Fragment>
      <AuthenticatedTemplate>
        <AuthContext.Provider value={{} as AuthContextType}>
          {children}
        </AuthContext.Provider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </UnauthenticatedTemplate>
    </Fragment>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
