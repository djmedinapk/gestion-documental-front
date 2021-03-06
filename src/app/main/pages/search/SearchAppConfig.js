import { lazy } from "react";
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';
import { authRoles } from 'app/auth';

const SearchApp = lazy(() => import("./SearchApp"));

i18next.addResourceBundle('en', 'searchPage', en);
i18next.addResourceBundle('es', 'searchPage', es);

const SearchAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/search",
      auth: authRoles.staff,
      element: <SearchApp />,
    },
  ],
};

export default SearchAppConfig;
