import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'fileAdminPage', en);
i18next.addResourceBundle('es', 'fileAdminPage', es);

const FilesAdminApp = lazy(() => import('./FilesAdminApp'));

const FilesAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/admin/files/:id',
      element: <FilesAdminApp />,
    },
    {
      path: 'apps/admin/files',
      element: <Navigate to="/apps/admin/files/all" />,
    },
  ],
};

export default FilesAdminAppConfig;
