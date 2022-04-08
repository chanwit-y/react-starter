import { FC, Fragment, useState, useEffect } from "react";
import { Backdrop, Box, CircularProgress, styled } from "@mui/material";
import { Header, Sidebar } from "../Common";
import { useLoader } from "../Context/LoaderProvider";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: 60,
  backgroundColor: "#F4F7FA",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  marginLeft: `0px`,
  // marginLeft: `0`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Layout: FC = ({ children }) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const loader = useLoader()

  return (
    <Fragment>
      <Backdrop
        sx={{ color: '#2962ff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loader.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box display="flex" minHeight="100vh">
        <Header open={isOpenSideBar} onOpen={setIsOpenSideBar} />
        <Sidebar open={isOpenSideBar} onOpen={setIsOpenSideBar} />
        <Main open={isOpenSideBar}>{children}</Main>
      </Box>
    </Fragment>
  );
};

export default Layout;
