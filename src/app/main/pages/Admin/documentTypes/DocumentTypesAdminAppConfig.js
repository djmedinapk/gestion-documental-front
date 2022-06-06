import i18next from "i18next";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import en from "./i18n/en";
import es from "./i18n/es";
import { authRoles } from "app/auth";

i18next.addResourceBundle("en", "documentTypeAdminPage", en);
i18next.addResourceBundle("es", "documentTypeAdminPage", es);

const DocumentTypesAdminApp = lazy(() => import("./DocumentTypesAdminApp"));

const DocumentTypesAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/admin/documentTypes",
      auth: authRoles.staff,
      element: <DocumentTypesAdminApp />,
    },
  ],
};

export default DocumentTypesAdminAppConfig;
