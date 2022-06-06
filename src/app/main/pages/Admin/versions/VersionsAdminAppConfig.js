import i18next from "i18next";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import en from "./i18n/en";
import es from "./i18n/es";
import { authRoles } from "app/auth";

i18next.addResourceBundle("en", "versionAdminPage", en);
i18next.addResourceBundle("es", "versionAdminPage", es);

const VersionsAdminApp = lazy(() => import("./VersionsAdminApp"));

const VersionsAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/admin/versions",
      auth: authRoles.staff,
      element: <VersionsAdminApp />,
    },
  ],
};

export default VersionsAdminAppConfig;
