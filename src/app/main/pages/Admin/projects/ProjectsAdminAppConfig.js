import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'projectAdminPage', en);
i18next.addResourceBundle('es', 'projectAdminPage', es);

const ProjectsAdminApp = lazy(() => import('./ProjectsAdminApp'));

const ProjectsAdminAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/admin/projects/:id',
      element: <ProjectsAdminApp />,
    },
    {
      path: 'apps/admin/projects',
      element: <Navigate to="/apps/admin/projects/all" />,
    },
  ],
};

export default ProjectsAdminAppConfig;
