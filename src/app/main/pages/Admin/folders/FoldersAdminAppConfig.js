import { authRoles } from 'app/auth';
import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'folderAdminPage', en);
i18next.addResourceBundle('es', 'folderAdminPage', es);

const FoldersAdminApp = lazy(() => import('./FoldersAdminApp'));

const FoldersAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'apps/admin/folders/:id',
      element: <FoldersAdminApp />,
    },
    {
      path: 'apps/admin/folders',
      element: <Navigate to="/apps/admin/folders/all" />,
    },
  ],
};

export default FoldersAdminAppConfig;
