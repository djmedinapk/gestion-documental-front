import FusePageSimple from "@fuse/core/FusePageSimple";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Breadcrumb from "./Breadcrumb";
import Breadcrumb2 from "./Breadcrumb2";
import DetailSidebarContent from "./DetailSidebarContent";
import DetailSidebarHeader from "./DetailSidebarHeader";
import FileList from "./FileList";
import MainSidebarContent from "./MainSidebarContent";
import MainSidebarHeader from "./MainSidebarHeader";
import reducer from "./store";
import { selectFileById, getFiles } from "./store/filesSlice";
import { getDocumentTypes } from "./store/documentTypesSlice";
import { getProjects } from "./store/projectsSlice";
import { getSearchs } from "./store/searchsSlice";
import { useParams } from "react-router";
import { useDeepCompareEffect } from "@fuse/hooks";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 160,
    height: 160,
    [theme.breakpoints.up("sm")]: {
      minHeight: 160,
      height: 160,
    },
  },
  "& .FusePageSimple-sidebarHeader": {
    minHeight: 160,
    height: 160,
    [theme.breakpoints.up("sm")]: {
      minHeight: 160,
      height: 160,
    },
  },
  "& .FusePageSimple-rightSidebar": {
    width: 320,
  },
}));

function FileManagerApp() {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    dispatch(getDocumentTypes());
    dispatch(getProjects());
    dispatch(getSearchs());
  }, [dispatch, routeParams]);

  return (
    <Root
      header={
        <div className="flex flex-col flex-1 pt-24 sm:pt-24 pb-12 sm:pb-12 relative">
          <div className="flex items-center justify-between">
            <Breadcrumb className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24 font-semibold" />
          </div>
          <div className="flex-1 items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              <Breadcrumb2 className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24 font-semibold" />
            </motion.div>
          </div>
        </div>
      }
      content={<FileList pageLayout={pageLayout} />}
      rightSidebarHeader={<DetailSidebarHeader />}
      rightSidebarContent={<DetailSidebarContent />}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default withReducer("fileManagerApp", reducer)(FileManagerApp);
