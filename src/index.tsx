import { MsalProvider } from "@azure/msal-react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StylesProvider from "@mui/styles/StylesProvider";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import msalInstance from "util/MsalInstance";
import App from "./Components/App";
import ThemeProvider from "./Components/Context/ThemeContext";
import AdapterDateDayjs from "@mui/lab/AdapterDayjs";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <StylesProvider injectFirst>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateDayjs}>
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </StylesProvider>
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
