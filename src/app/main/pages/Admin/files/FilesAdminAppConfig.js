import i18next from "i18next";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import en from "./i18n/en";
import es from "./i18n/es";
import { authRoles } from "app/auth";

i18next.addResourceBundle("en", "fileAdminPage", en);
i18next.addResourceBundle("es", "fileAdminPage", es);

const FilesAdminApp = lazy(() => import("./FilesAdminApp"));

const FilesAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/admin/files",
      auth: authRoles.staff,
      element: <FilesAdminApp />,
    },
  ],
};

export default FilesAdminAppConfig;
