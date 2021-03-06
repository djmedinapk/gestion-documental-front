import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';
import { authRoles } from 'app/auth';

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
        id: 'project-component',
        title: 'Project',
        translate: 'PROJECTPAGE',
        type: 'item',
        icon: 'whatshot',
        url: '/projects',
      },
      {
        id: 'search-component',
        title: 'Search',
        translate: 'SEARCHPAGE',
        type: 'item',
        icon: 'search',
        url: 'apps/search',
      },
      {
        id: 'admin',
        title: 'Admin',
        type: 'collapse',
        translate: 'ADMIN',
        icon: 'info',
        auth: authRoles.admin,
        children: [  
          {
            id: 'documentTypesAdmin',
            title: 'documentTypes',
            translate: 'DOCUMENTTYPEPAGE',
            type: 'item',
            icon: 'account_tree',
            url: 'apps/admin/documentTypes',
          },
          {
            id: 'filesAdmin',
            title: 'files',
            translate: 'FILEPAGE',
            type: 'item',
            icon: 'account_tree',
            url: 'apps/admin/files',
          },
          {
            id: 'foldersAdmin',
            title: 'folders',
            translate: 'FOLDERPAGE',
            type: 'item',
            icon: 'account_tree',
            url: 'apps/admin/folders',
          },
          {
            id: 'productTypesAdmin',
            title: 'productTypes',
            translate: 'PRODUCTTYPEPAGE',
            type: 'item',
            icon: 'account_tree',
            url: 'apps/admin/productTypes',
          },        
          {
            id: 'projectsAdmin',
            title: 'projects',
            translate: 'PROJECTPAGE',
            type: 'item',
            icon: 'account_tree',
            url: 'apps/admin/projects',
          },
          {
            id: 'versionsAdmin',
            title: 'versions',
            translate: 'VERSIONPAGE',
            type: 'item',
            icon: 'account_tree',
            url: 'apps/admin/versions',
          },
          
        ],
      },
    ],
  },
];

export default navigationConfig;
