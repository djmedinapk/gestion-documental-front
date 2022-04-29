import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        translate: 'EXAMPLE',
        type: 'item',
        icon: 'whatshot',
        url: 'example',
      },
      {
        id: 'project-component',
        title: 'Project',
        translate: 'PROJECTPAGE',
        type: 'item',
        icon: 'whatshot',
        url: '/',
      },
      {
        id: 'admin',
        title: 'Admin',
        type: 'collapse',
        translate: 'ADMIN',
        icon: 'info',
        children: [          
          {
            id: 'projectsAdmin',
            title: 'projects',
            translate: 'PROJECTPAGE',
            type: 'item',
            url: 'apps/admin/projects',
          },
          {
            id: 'productTypesAdmin',
            title: 'productTypes',
            translate: 'PRODUCTTYPEPAGE',
            type: 'item',
            url: 'apps/admin/productTypes',
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
