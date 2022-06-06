import i18next from "i18next";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import en from "./i18n/en";
import es from "./i18n/es";
import { authRoles } from "app/auth";

i18next.addResourceBundle("en", "productTypeAdminPage", en);
i18next.addResourceBundle("es", "productTypeAdminPage", es);

const ProductTypesAdminApp = lazy(() => import("./ProductTypesAdminApp"));

const ProductTypesAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/admin/productTypes",
      auth: authRoles.staff,
      element: <ProductTypesAdminApp />,
    },
  ],
};

export default ProductTypesAdminAppConfig;
