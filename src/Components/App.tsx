import { BrowserRouter } from "react-router-dom";
import Env from "../Lib/Utils/Env";
import AuthProvider from "./Context/AuthContext";
import Layout from "./Layout";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter basename={Env.BASE_NAME}>
      <AuthProvider>
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
