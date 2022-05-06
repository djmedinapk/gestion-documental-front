import { lazy } from "react";

const SearchApp = lazy(() => import("./SearchApp"));

const SearchAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/search",
      element: <SearchApp />,
    },
  ],
};

export default SearchAppConfig;
