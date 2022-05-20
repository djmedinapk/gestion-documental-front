import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const POGeneralTemplate = lazy(() => import('./poGeneralTemplate/POGeneralTemplate'));

const POAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/e-commerce/products/:productId/*',
      element: <POGeneralTemplate />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
  ],
};

export default POAppConfig;
