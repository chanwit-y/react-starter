import {
  createContext,
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
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
import { useApplication } from "./ApplicationProvider";

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
  const { username } = useApplication();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const { data, refetch } = useQueryService<UserProfile>(
    userService.getByEmail(username)
  );

  useEffect(() => {
    if (username) refetch();
  }, [username]);

  useEffect(() => {
    setUserProfile(data);
  }, [data]);

  return (
        <AuthContext.Provider value={{} as AuthContextType}>
          {children}
        </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
