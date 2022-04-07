import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { error$ } from "./Observable/error.obs";
import { AppInsightInstance } from "./Utils/AppInsightInstance";
// import { getAccessToken } from "./MsalInstance";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

const compare = (name?: string, input?: string) => name?.indexOf(input ?? '') !== -1

export class HttpClient {
  private _api: AxiosInstance;

  public constructor() {
    this._api = axios.create();
    this._api.interceptors.request.use(async (config: AxiosRequestConfig) => {
      // const jwtToken = await getAccessToken();
      const jwtToken = '';
      config.headers = {
        "content-Type": "application/json",
        // "app-version": "1.1.0",
        "app-version": "1.0.0",
        Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJhcGk6Ly9jODExNjliMS1mMjllLTRhYmYtOWNkOS03OWIwNjlkNTVmMGEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iYmI4ZGE4Zi1mMzc0LTQ5MGYtOTE5MC0yMjQyMTc2ZTExN2MvIiwiaWF0IjoxNjQ5MzEzMjAxLCJuYmYiOjE2NDkzMTMyMDEsImV4cCI6MTY0OTMxNzE0MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUNJbzhKQ0tYb0REV2pSU1ZqT2VISWZ3U2VTV0xBL0FJanlHR2E1S2lxSlJoNjVNTUlWRTJPZG9IWXpST1hTNnAiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiZDY5YTMyZmQtMDdmZi00NTc2LTg0Y2EtOTk4NmY2YTljNzVlIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJXYW5ndGFwaGFuIiwiZ2l2ZW5fbmFtZSI6Ikt1a2lhdCIsImlwYWRkciI6IjU4LjguMTguMjE3IiwibmFtZSI6Ikt1a2lhdCBXYW5ndGFwaGFuIiwib2lkIjoiYmM2M2EwZTItNjk5OS00ZDI1LWI0YWMtNDIwMzJjMTU3M2RhIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTI1MjczMjAxNDQtMjcxOTY3MTA3NS0zMTQ3NDAyNjk1LTE3MjgxIiwicmgiOiIwLkFYSUFqOXE0dTNUekQwbVJrQ0pDRjI0UmZMRnBFY2llOHI5S25ObDVzR25WWHdweUFHby4iLCJyb2xlcyI6WyJCUE4tRU5NTy1BRE1JTiIsIkJUSC1LUEktVVNFUiIsIkJUSC1UQVAtQURNSU4iLCJCVEgtTURCLUFETUlOIiwiQlRILU9UUy1DT1VOVFJZLUFETUlOIiwiQlRILU9UUy1DT1JQLUFETUlOIiwiQlRILVVTUi1SRUFEQUxMIiwiQlRILUNSTS1VU0VSIiwiQlRILU9UUy1BQ0NPVU5UIiwiQlRILU9UUy1FTVBMT1lFRSIsIkJUSC1NWUJQLVVTRVIiXSwic2NwIjoidGFwLWFwcC1hcGkgdGFwLWJvLWFwaSIsInN1YiI6IjlZaFR5Y2cxOGNYcVhvY2NiMzZGOXF2emloYVppZEZxWm1NTi1EaDdwYXciLCJ0aWQiOiJiYmI4ZGE4Zi1mMzc0LTQ5MGYtOTE5MC0yMjQyMTc2ZTExN2MiLCJ1bmlxdWVfbmFtZSI6Imt1a2lhdF93QGJhbnB1LmNvLnRoIiwidXBuIjoia3VraWF0X3dAYmFucHUuY28udGgiLCJ1dGkiOiJVczk0d2NFWTJVcWFrY2tkeHdPUEFBIiwidmVyIjoiMS4wIn0.EigyJtrTuoYMEFRRfaUvIAF1ZfvIAPul7q7cEwwXwvjjgeVNOTlFcEvcHqzqjWsy-_y0rGlIAsQWJxLBBO90uz2fZuf8FknNLdelRiuHhnqT07Gh1A6jn9HRvofwHKiHqA0wgaOSt6fDHPb6D3g0-SScHESUa3Ww7-_mmBUJeHWXKB28vGkxd1W3mFoZuDUyJxajbxvh3fGg8a9I8XJXKNPz-COnfKM5CoAhXoEAbFTcONKRe1D0znESBkbmoUj-uB8jyIhKc9CNM0zZsx23UWrOjkgF--anhk_k1nasMOm-PxkGRCz3RMi0EVdf7-FH16CCEsEaGeo5nHmICFK57Q',
        "Access-Control-Allow-Origin": true,
      };
      config.timeout = 30 * 1000;

      return config;
    });

    this._api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const { response } = error
        const ignores = [{
          name: 'profiles/search',
          method: 'get',
        }]
        if (!response) return Promise.reject(error)


        AppInsightInstance.getAppInsights?.trackException({
          error: new Error(JSON.stringify({
            error: JSON.stringify(response.data),
            serviceName: response.config?.url ?? '',
            param: JSON.stringify(response.config.data)
          })),
          severityLevel: SeverityLevel.Error
        })

        const serviceError = response.status >= 500 && response.status <= 599;
        if (serviceError && !ignores.some(ignore => compare(ignore.name, response.config.url))) {
          error$.next(error);
        }
        return Promise.reject(error.response)
      }
    );
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.get(url, config);
  }

  protected post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.post(url, data, config);
  }

  protected put<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.put(url, data, config);
  }

  protected patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.patch(url, data, config);
  }

  protected delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.delete(url, config);
  }

  protected success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  protected getUrlParam<T>(req: T) {
    let urlParam = "";
    for (let key in req) {
      if (urlParam !== "") {
        urlParam += "&";
      }
      urlParam += key + "=" + req[key];
    }

    return urlParam;
  }
}
