import {
  Box,
  CSSObject,
  Divider as MuiDivider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText as MuiListItemText,
  styled,
  Theme,
  Typography,
} from "@mui/material";

import { drawerWidth } from "../../Lib/Constants";
import { Colors } from "../../Lib/Constants/Colors";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FadeIn } from ".";
import { Menu } from "../../@types/MenuType";

const Divider = styled(MuiDivider)({
  margin: 10,
  borderColor: Colors.menuGroup,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //   padding: theme.spacing(0, 1),
  color: "white",
  marginBottom: 20,
  ...theme.mixins.toolbar,
}));

const ListItemText = styled(MuiListItemText)(() => ({
  color: "#fff",
  letterSpacing: 1,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: Colors.backgroundColor,
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: Colors.backgroundColor,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BoxListItem = styled(Box)<{ active?: boolean }>(({ active = false }) => ({
  borderRadius: 5,
  background: active ? "linear-gradient(45deg, #00B490 30%, #472F92 90%)" : "",
}));

type Props = {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar: FC<Props> = ({ open, onOpen }) => {
  const location = useLocation();

  const getMenu = (menu: Menu[], isAdmin: boolean) => {
    return menu
      .filter((m) => m.active)
      .map(
        (item, index) =>
            <BoxListItem
              key={index}
              mb={2}
              mx={1}
              active={
                location.pathname.includes(item.name) ||
                location.pathname === item.path
              }
            >
              <Link style={{ textDecoration: "none" }} to={item.path}>
                <ListItem button key={item.name}>
                  <ListItemIcon>
                    <Box color="#fff">
                      <img src={item.icon} alt="menu icon" />
                    </Box>
                  </ListItemIcon>

                  {/* <Typography>Smart Pole System</Typography> */}

                  <ListItemText primary={item.text}>
                    {/* <Box color="#fff">
                      <Typography>{item.text}</Typography>
                    </Box> */}
                  </ListItemText>
                </ListItem>
              </Link>
            </BoxListItem>
      );
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {!open ? (
          <IconButton
            color="inherit"
            onClick={() => {
              onOpen((prev) => !prev);
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        ) : (
          <FadeIn width="90%">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // px={2}
              width="100%"
            >
              <Typography variant="h6" fontWeight={700}>
                Smart Pole
              </Typography>

              <IconButton
                color="inherit"
                onClick={() => {
                  onOpen((prev) => !prev);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </FadeIn>
        )}
      </DrawerHeader>
     
    </Drawer>
  );
};
