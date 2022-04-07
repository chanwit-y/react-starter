// Define type of environments
interface IProcessEnv {
  NODE_ENV: string;
  REACT_APP_BASE_NAME: string;
  REACT_APP_TENANT_ID: string;
  REACT_APP_CLIENT_ID: string;
  REACT_APP_REDIRECT_URL: string;
  REACT_APP_LOGOUT_URL: string;
  REACT_APP_API_SCOPE: string;
  REACT_APP_API_ENDPOINT: string;
  REACT_APP_APP_INSIGHT: string;
  REACT_APP_IMAGE_ROOT: string;
  REACT_APP_GOOGLE_MAPS_API_KEY: string;
  REACT_APP_ANNOUNCEMENT_INTERVAL_TIME: number;
}

declare namespace process {
  let env: IProcessEnv;
}

let envSource = process.env;

if ((window as any)._env != null) {
  // window.env is set only from env-override.js which is generated inside docker startup.
  // local run won't have this property initialized.

  envSource = (window as any)._env;
}

/* Get constants from environment variables.
 * Values are configured in .env (for development) and .env.production (for staging and production)
 */
const {
  NODE_ENV,
  REACT_APP_BASE_NAME,
  REACT_APP_TENANT_ID,
  REACT_APP_CLIENT_ID,
  REACT_APP_REDIRECT_URL,
  REACT_APP_LOGOUT_URL,
  REACT_APP_API_SCOPE,
  REACT_APP_API_ENDPOINT,
  REACT_APP_APP_INSIGHT,
  REACT_APP_IMAGE_ROOT,
  REACT_APP_GOOGLE_MAPS_API_KEY,
  REACT_APP_ANNOUNCEMENT_INTERVAL_TIME,
} = envSource;

export default {
  NODE_ENV,
  BASE_NAME: REACT_APP_BASE_NAME ?? "",
  CLIENT_ID: REACT_APP_CLIENT_ID ?? "",
  TENANT_ID: REACT_APP_TENANT_ID ?? "",
  REDIRECT_URL: REACT_APP_REDIRECT_URL ?? "",
  LOGOUT_REDIRECT_URL: REACT_APP_LOGOUT_URL ?? "",
  API_SCOPE: REACT_APP_API_SCOPE ?? "",
  API_ENDPOINT: REACT_APP_API_ENDPOINT ?? "",
  APP_INSIGHT: REACT_APP_APP_INSIGHT ?? "",
  IMAGE_ROOT: REACT_APP_IMAGE_ROOT ?? "",
  GOOGLE_MAPS_API_KEY: REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  ANNOUNCEMENT_INTERVAL_TIME: REACT_APP_ANNOUNCEMENT_INTERVAL_TIME ?? 60000,
};
