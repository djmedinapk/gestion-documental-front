import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';
import ExplorerApp from './ExplorerApp';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'explorerPage', en);
i18next.addResourceBundle('es', 'explorerPage', es);

const ExplorerConfig = {
    settings: {},
    routes: [
        {
          path: '/explorer/:folder/:id',
          auth: authRoles.staff,
          element: <ExplorerApp />,
        },
      ],
}

export default ExplorerConfig;