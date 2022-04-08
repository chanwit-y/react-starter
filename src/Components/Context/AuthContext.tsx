import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserProfile } from "@dto";
import { useQueryService } from "@context-hook/useQueryService";
import usrSrv from "@context-service/UserProfile.service";
import { useApplication } from "./ApplicationProvider";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export enum AppMode {
  User,
  Admin,
}

type AuthContextType = {
  userProfile?: UserProfile;
  roles?: string[];
  selectedRole?: string;
  setSelectedRole: Dispatch<SetStateAction<string>>;
  appMode: AppMode;
  setAppMode: Dispatch<SetStateAction<AppMode>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FC = ({ children }) => {
  const { username } = useApplication();

  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [appMode, setAppMode] = useState<AppMode>(AppMode.User);
  const [selectedRole, setSelectedRole] = useState<string>("User");

  const { data, refetch, isFetched, isFetching, isLoading } =
    useQueryService<UserProfile>(usrSrv.getByEmail(username));

  useEffect(() => {
    if (username) refetch();
  }, [username]);

  useEffect(() => {
    setUserProfile(data);
  }, [data]);

  if (!isFetched || isFetching || isLoading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontWeight={500}
        fontSize={20}
        color={grey[700]}
      >
        Authentication...
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        selectedRole,
        setSelectedRole,
        appMode,
        setAppMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
