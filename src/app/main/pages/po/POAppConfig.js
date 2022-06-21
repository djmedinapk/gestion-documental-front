import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import es from './i18n/es';
import i18next from 'i18next';

i18next.addResourceBundle('en', 'poPage', en);
i18next.addResourceBundle('es', 'poPage', es);

const POGeneralTemplate = lazy(() => import('./poGeneralTemplate/POGeneralTemplate'));
const POEditGeneralTemplate = lazy(() => import('./poEditGeneralTemplate/POEditGeneralTemplate'));

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
      path: 'apps/po/po-edit-general-template',
      element: <POEditGeneralTemplate />,
    },
    {
      path: 'apps/po',
      element: <Navigate to="po-general-template" />,
    },
  ],
};

export default POAppConfig;
