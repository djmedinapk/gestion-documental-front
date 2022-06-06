import i18next from "i18next";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import en from "./i18n/en";
import es from "./i18n/es";
import { authRoles } from "app/auth";

i18next.addResourceBundle("en", "folderAdminPage", en);
i18next.addResourceBundle("es", "folderAdminPage", es);

const FoldersAdminApp = lazy(() => import("./FoldersAdminApp"));

const FoldersAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/admin/folders",
      auth: authRoles.staff,
      element: <FoldersAdminApp />,
    },
  ],
};

export default FoldersAdminAppConfig;
