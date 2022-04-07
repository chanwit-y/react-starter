import { FC, Dispatch, SetStateAction, useState } from "react";
import {
  Toolbar,
  styled,
  Avatar,
  Box,
  Typography,
  Divider as MuiDivider,
  IconButton,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { AppMode, useAuth } from "../Context/AuthContext";
import { drawerWidth } from "../../Lib/Constants";
import { grey } from "@mui/material/colors";
import { Roles, Tenants } from "../Share/Dropdown";
import Env from "../../Lib/Utils/Env";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IOSSwitch, ArrowPopover } from ".";
import { Colors } from "../../Lib/Constants/Colors";
import { useMsal } from "@azure/msal-react";
import { useLocalStorage } from "../../Lib/Hook/useLocalStorage";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "white",
  borderBottom: 1,
  borderBottomColor: "lightgrey",
  borderBottomStyle: "solid",
  zIndex: theme.zIndex.drawer + 1,
  // transition: theme.transitions.create(["width", "margin"], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  ...(open
    ? {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {
        marginLeft: 74,
        width: `calc(100% - ${74}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
}));

const ProfileAvatar = styled(Avatar)<{ size?: number; marginLeft?: number }>(
  ({ size = 40, marginLeft = 30 }) => ({
    marginLeft: marginLeft,
    marginRight: 5,
    width: size,
    height: size,
  })
);

const Divider = styled(MuiDivider)`
  margin-left: 15px;
  margin-right: 15px;
`;

type Props = {
  open: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
};

export const Header: FC<Props> = ({ open, onOpen }) => {
  const { userProfile, appMode, setAppMode } = useAuth();
  const { instance } = useMsal();
  const navigate = useNavigate();

  return (
    <AppBar elevation={0} open={open}>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          // alignItems="center"
          flexGrow={1}
          py={1}
          mx={1}
          color="black"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography alignSelf="center" variant="body2">
              Tenent:
            </Typography>
            <Tenants />

            {/*
            <Typography variant="subtitle2" mx={1}>
              TCM - Melak
            </Typography>
            <KeyboardArrowDownIcon />
            */}
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
          >
            <Typography variant="subtitle2" mx={1}>
              Back Office
            </Typography>
            <IOSSwitch
              defaultChecked={appMode === AppMode.Admin}
              value={appMode === AppMode.Admin}
              onChange={(e) => {
                if (appMode === AppMode.User) {
                  navigate(`/tenant`);
                } else {
                  navigate(`/`);
                }
                setAppMode(e.target.checked ? AppMode.Admin : AppMode.User);
              }}
            />
            <Divider orientation="vertical" />
            <NotificationsNoneIcon color="disabled" />
            <Typography variant="body2" color={grey[600]} ml={2}>
              Role:
            </Typography>
            <Roles />
            {/* <Typography variant="subtitle2" mx={1}>
              Administrator
            </Typography> */}
            {/* <KeyboardArrowDownIcon /> */}
            <ProfileAvatar
              src={
                userProfile?.personId
                  ? `${Env.IMAGE_ROOT}/profile-pictures/${userProfile?.personId}.jpeg`
                  : ""
              }
            />
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle2" ml={1} mr={0.5}>
                {`${userProfile?.firstNameEn} ${userProfile?.lastNameEN}`}
              </Typography>
              {/* <IconButton onClick={() => setOpenPopover(true)}>
              <KeyboardArrowDownIcon />
            </IconButton> */}
              <ArrowPopover>
                <Box
                  display="flex"
                  px={1}
                  alignItems="center"
                  justifyContent="space-between"
                  width={350}
                  height={50}
                >
                  <Typography
                    variant="body2"
                    letterSpacing={1}
                    fontWeight={700}
                  >
                    Banpu Public Company Limited
                  </Typography>
                  <IconButton onClick={() => instance.logout()}>
                    <LoginIcon />
                  </IconButton>
                </Box>
                <Box
                  bgcolor={grey[100]}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                  height={70}
                >
                  <ProfileAvatar
                    marginLeft={20}
                    size={50}
                    src={`${Env.IMAGE_ROOT}/profile-pictures/${userProfile?.personId}.jpeg`}
                  />
                  <Box mx={1}>
                    <Typography variant="body1">{`${userProfile?.firstNameEn} ${userProfile?.lastNameEN}`}</Typography>
                    <Typography fontSize={12} color={grey[800]}>
                      {userProfile?.jobTitle}
                    </Typography>
                  </Box>
                </Box>
              </ArrowPopover>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
