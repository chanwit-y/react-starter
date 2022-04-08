import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { AuthPage } from "context-page";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { load$ } from "../Lib/Observable/load.obs";
import Env from "../Lib/Utils/Env";
import ApplicationProvider from "./Context/ApplicationProvider";
import AuthProvider from "./Context/AuthContext";
import Layout from "./Layout";
import { Router } from "./Router";

function App() {
  useEffect(() => {
    load$.subscribe((l) => {
      console.log(l);
    });
  }, []);

  return (
    <BrowserRouter basename={Env.BASE_NAME}>
        <ApplicationProvider>
          <AuthProvider>
            <Layout>
              <Router />
            </Layout>
          </AuthProvider>
        </ApplicationProvider>
    </BrowserRouter>
  );
}

export default App;
