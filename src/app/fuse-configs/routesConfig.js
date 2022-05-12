import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginPageConfig from 'app/main/pages/auth/login/LoginPageConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import FileManagerAppConfig from 'app/main/pages/search/FileManagerAppConfig';
import ProductTypesAdminAppConfig from 'app/main/pages/Admin/productType/ProductTypesAdminAppConfig'
import ProjectConfig from 'app/main/pages/project/ProjectConfig';
import ExplorerConfig from 'app/main/pages/explorer/ExplorerConfig';
import SearchAppConfig from "app/main/pages/search/SearchAppConfig";
import DocumentTypesAdminAppConfig from "app/main/pages/Admin/documentTypes/DocumentTypesAdminAppConfig";
import FilesAdminAppConfig from "app/main/pages/Admin/files/FilesAdminAppConfig";
import FoldersAdminAppConfig from "app/main/pages/Admin/folders/FoldersAdminAppConfig";
import ProjectsAdminAppConfig from "app/main/pages/Admin/projects/ProjectsAdminAppConfig";
import VersionsAdminAppConfig from "app/main/pages/Admin/versions/VersionsAdminAppConfig";
import ECommerceAppConfig from "app/main/pages/e-commerce/ECommerceAppConfig";

const routeConfigs = [
  LoginPageConfig,
  SearchAppConfig,
  DocumentTypesAdminAppConfig,
  FilesAdminAppConfig,
  FoldersAdminAppConfig,
  ProductTypesAdminAppConfig,
  FileManagerAppConfig,
  ProjectConfig,
  ExplorerConfig,
  ProjectsAdminAppConfig,
  VersionsAdminAppConfig,
  ECommerceAppConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: "/login",
    element: <Navigate to="login" />,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
