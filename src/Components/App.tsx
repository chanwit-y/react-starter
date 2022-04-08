import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { load$ } from "../Lib/Observable/load.obs";
import Env from "../Lib/Utils/Env";
import AppContextProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthContext";
import Layout from "./Layout";
import { Router } from "./Router";

function App() {
  useEffect(() => {
    load$.subscribe((l) => {
      console.log(l)
    });
  }, []);

  return (
    <BrowserRouter basename={Env.BASE_NAME}>
      <AppContextProvider>
        <AuthProvider>
          <Layout>
            <Router />
          </Layout>
        </AuthProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
