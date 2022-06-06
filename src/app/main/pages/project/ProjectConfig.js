import i18next from 'i18next';
import Project from './Project';
import en from './i18n/en';
import es from './i18n/es';
import ProjectBoard from './ProjectBoard';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'projectPage', en);
i18next.addResourceBundle('es', 'projectPage', es);

const ProjectConfig = {
    settings: {},
    routes: [
        {
          path: '/projects',
          auth: authRoles.staff,
          element: <ProjectBoard />,
        },
      ],
}

export default ProjectConfig;