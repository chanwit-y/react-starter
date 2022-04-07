import env from "./Env";
import {
  Configuration,
  PublicClientApplication,
  SilentRequest,
} from "@azure/msal-browser";
import { isIEorEdge } from "./VersionBrowser";
import { LOGIN_MICROSOFTONLINE_URL } from "../Constants";

const config: Configuration = {
  auth: {
    authority: `${LOGIN_MICROSOFTONLINE_URL}${env.TENANT_ID}`,
    clientId: env.CLIENT_ID,
    redirectUri: env.REDIRECT_URL,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: isIEorEdge() > 0,
  },
};

const msalInstance = new PublicClientApplication(config);
export const getAccessToken = async () => {
  let token = "";
  const accounts = await msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    const silentRequest: SilentRequest = {
      account: accounts[0],
      scopes: [env.API_SCOPE],
    };
    const acquireToken = await msalInstance.acquireTokenSilent(silentRequest);
    token = acquireToken.accessToken;
  }
  return token;
};

export const getEmail = async () => {
  let email = "";
  const accounts = await msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    email = accounts[0].username; // username is email
  }
  return email;
};

export default msalInstance;
