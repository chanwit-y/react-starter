import { FC, Fragment, useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { Header, Sidebar } from "../Common";

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

  return (
    <Fragment>
      {/* <Backdrop className={classes.backdrop} open={loader?.loading ?? false}>
        <CircularProgress color="primary" thickness={6} />
      </Backdrop> */}
      {/* <Backdrop
        sx={{ color: '#2962ff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loader?.loading || false}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Box display="flex" minHeight="100vh">
        <Header open={isOpenSideBar} onOpen={setIsOpenSideBar} />
        <Sidebar open={isOpenSideBar} onOpen={setIsOpenSideBar} />
        <Main open={isOpenSideBar}>{children}</Main>
      </Box>
    </Fragment>
  );
};

export default Layout;
