import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AppInsightInstance } from "./AppInsightInstance";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import { IResponse } from "../../@types/ServiceType";
import { IgnoreService } from "../../@types/ErrorType";
import { getAccessToken } from "./MsalInstance";
import dayjs from "dayjs";
// import load$ from "../Observable/load.obs";
import { LoaderTypeConstant } from "../Constants";
import { error$, loader$ } from "../Observable";

const compare = (name?: string, input?: string) =>
  name?.indexOf(input ?? "") !== -1;

export class HttpClient {
  private _api: AxiosInstance;

  public constructor() {
    this._api = axios.create();
    this._api.interceptors.request.use(async (config: AxiosRequestConfig) => {
      const jwtToken = await getAccessToken();
      config.headers = {
        "content-Type": "application/json",
        // "app-version": "1.1.0",
        "app-version": "1.0.0",
        Authorization: "Bearer " + jwtToken,
        "Access-Control-Allow-Origin": true,
      };
      config.timeout = 30 * 1000;
      config.data = dayjs().valueOf();

      loader$.next({
        type: LoaderTypeConstant.Loading,
        loaderId: `${config.data}`
      });

      return config;
    });

    this._api.interceptors.response.use(
      (response: AxiosResponse) => {
        loader$.next({
          type: LoaderTypeConstant.Loaded,
          loaderId: `${response.config.data}`
        });
        return response;
      },
      (error: AxiosError) => {
        const { response } = error;

        loader$.next({
          type: LoaderTypeConstant.Loaded,
          loaderId: `${error?.response?.config.data}`
        });

        if (!response) return Promise.reject(error);

        this.runAppInsigth(
          response.data,
          response.config?.url ?? "",
          response.config.data
        );

        const ignores: IgnoreService[] = [];
        const serviceError = response.status >= 500 && response.status <= 599;
        const unauthroize = response.status === 401;
        const ignore = ignores.some((ignore) =>
          compare(ignore.name, response.config.url)
        );
        if (unauthroize && !ignore) {
          error$.next({ statusCode: 401 });
        }
        if (serviceError && !ignore) {
          error$.next({ statusCode: 500 });
        }
        return Promise.reject(error.response);
      }
    );
  }

  private runAppInsigth(error: any, serviceName: string, param: any) {
    AppInsightInstance.getAppInsights?.trackException({
      error: new Error(
        JSON.stringify({
          error: JSON.stringify(error),
          serviceName,
          param: JSON.stringify(param),
        })
      ),
      severityLevel: SeverityLevel.Error,
    });
  }

  protected get<T, R = AxiosResponse<T>>(
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

export const unwrap = async <T>(response: AxiosResponse<IResponse<T>>) =>
  response.data.status ? response.data.data : response.data.errors;
