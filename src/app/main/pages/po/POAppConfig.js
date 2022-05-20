import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const POGeneralTemplate = lazy(() => import('./poGeneralTemplate/POGeneralTemplate'));

const POAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/po/po-general-template',
      element: <POGeneralTemplate />,
    },
    {
      path: 'apps/po',
      element: <Navigate to="po-general-template" />,
    },
  ],
};

export default POAppConfig;
