import {
  ReactPlugin,
  withAITracking,
} from "@microsoft/applicationinsights-react-js";
import React, { createContext, FC, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { AppInsightInstance } from "../../Lib/Utils/AppInsightInstance";

type AppInsightType = {
  instrumentationKey: string;
  reactPlugin: ReactPlugin;
};

type Props = {
  instrumentationKey: string;
};

const AITemplateContext = createContext<AppInsightType | undefined>(undefined);

const TemplateProvider: FC<Props> = ({ children, instrumentationKey }) => {
  const history = useNavigate();
  const aiTemplateContext: AppInsightType = {
    instrumentationKey: instrumentationKey,
    reactPlugin: new ReactPlugin(),
  };

  useEffect(() => {
    AppInsightInstance.initialize(instrumentationKey, history);
  }, [instrumentationKey]);

  try {
    return (
      <AITemplateContext.Provider value={aiTemplateContext}>
        {children}
      </AITemplateContext.Provider>
    );
  } catch (ex) {
    throw ex;
  }
};

export const AITemplateProvider = withAITracking(
  new ReactPlugin(),
  TemplateProvider
);
