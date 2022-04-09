import { BrowserRouter } from "react-router-dom";
import Env from "@component-util/Env";
import { ApplicationProvider, AuthProvider } from "@context";
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
