import AdapterDateDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StylesProvider from "@mui/styles/StylesProvider";
import React, { FC } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

// import "./index.css";
import LoaderProvider from "./LoaderProvider";
import MessageBoxProvider from "./MessageBoxProvider";
import ModalProvider from "./ModalContext";
import ThemeProvider from "./ThemeContext";

const AppContextProvider: FC = ({ children }) => {
  // console.log(useLocation())
  // console.log(useNavigate())
  return (
    <StylesProvider injectFirst>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateDayjs}>
          <LoaderProvider>
            <ModalProvider>
              <MessageBoxProvider>
                {children}
              </MessageBoxProvider>
            </ModalProvider>
          </LoaderProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default AppContextProvider
