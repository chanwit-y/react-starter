import { BrowserRouter } from "react-router-dom";
import Env from "../Lib/Utils/Env";
import Layout from "./Layout";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter basename={Env.BASE_NAME}>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
