import { BrowserRouter } from "react-router-dom";
import Env from "../Lib/Utils/Env";
import AppContextProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthContext";
import Layout from "./Layout";
import { Router } from "./Router";

function App() {
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
