import { createContext, useContext, ReactNode } from "react";

export type AppConfig = {
  siteIdentity?: {
    name?: string;
    logoUrl?: string;
  };
  theming?: {
    primaryColor?: string;
  };
  app_name?: string;
  slogan?: string;
  descriptionHero?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  seo_keyword?: string;
  apiEndpoints?: {
    cmsBaseUrl?: string;
    cmsSiteId?: string;
  };
  strapi_url?: string;
  strapi_site_slug?: string;
  gtm_id?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string; // allow \n for line breaks
  };
};

declare global {
  interface Window {
    APP_CONFIG: AppConfig;
  }
}

const ConfigContext = createContext<AppConfig | null>(null);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const config: AppConfig = window.APP_CONFIG || {};
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error("useConfig 必须在 ConfigProvider 内部使用");
  }
  return context;
};