import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'productTypeAdminPage', en);
i18next.addResourceBundle('es', 'productTypeAdminPage', es);

const ProductTypesAdminApp = lazy(() => import('./ProductTypesAdminApp'));

const ProductTypesAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/admin/productTypes/:id',
      element: <ProductTypesAdminApp />,
    },
    {
      path: 'apps/admin/productTypes',
      element: <Navigate to="/apps/admin/productTypes/all" />,
    },
  ],
};

export default ProductTypesAdminAppConfig;
