import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

class AppInsight {
  private _reactPlugin: ReactPlugin = new ReactPlugin();
  private _appInsights: ApplicationInsights | undefined;

  constructor() { }

  public initialize(
    instrumentationKey: string,
    browserHistory: any 
  ) {
    if (!browserHistory) {
      throw new Error("Could not initialize Telemetry Service");
    }
    if (!instrumentationKey) {
      throw new Error("Instrumentation key not provided in AppInsight.ts");
    }

    // this._reactPlugin = new ReactPlugin();
    this._appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: instrumentationKey,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        extensions: [this._reactPlugin],
        extensionConfig: {
          [this._reactPlugin.identifier]: {
            history: browserHistory,
          },
        },
      },
    });

    this._appInsights.loadAppInsights();
  }

  get getAppInsights(): ApplicationInsights | undefined {
    return this._appInsights;
  }

  get getReactPlugin(): ReactPlugin | undefined {
    return this._reactPlugin;
  }
}

export const AppInsightInstance = new AppInsight();