import { BrowserRouter } from "react-router-dom";
import Env from "../Lib/Utils/Env";
import ApplicationProvider from "./Context/ApplicationContext";
import AuthProvider from "./Context/AuthContext";
import Layout from "./Layout";
import { Router } from "./Router";

function App() {
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
