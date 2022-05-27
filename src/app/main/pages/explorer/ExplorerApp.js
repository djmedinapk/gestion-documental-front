import FusePageSimple from "@fuse/core/FusePageSimple";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import reducer from "./store";
import withReducer from "app/store/withReducer";
import {
  getCurrentFolder,
  getFiles,
  handleNewFileDialog,
  handleNewFolderDialog,
  selectFiles,
  getFindFolder,
  getFindProject,
  handleProjectDataFind
} from "./store/explorerSlice";
import { useParams } from "react-router";
import Breadcrumb from "./Breadcrumb";
import MainSidebarHeader from "./MainSidebarHeader";
import MainSidebarContent from "./MainSidebarContent";
import {
  Fade,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import NewFolderDialog from "./NewFolderDialog";
import NewFileDialog from "./NewFileDialog";
import FileList from "./FileList";

import { useNavigate } from "react-router-dom";
import { changeGeneralParamsNewPOClient } from "./../../../store/globalParamsSlice";
import { getDocumentTypes } from "./store/documentTypeSlice";

import { dataPO } from "./../po/store/Params";
import { changeDatosPOs } from "./../po/store/poGeneralTemplateSlice";
import RightSideBarContent from "./RightSideBarContent";
import RightSideBarHeader from "./RightSideBarHeader";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 96,
    height: 96,
    [theme.breakpoints.up("sm")]: {
      minHeight: 160,
      height: 160,
    },
  },
  "& .FusePageSimple-sidebarHeader": {
    minHeight: 96,
    height: 96,
    [theme.breakpoints.up("sm")]: {
      minHeight: 160,
      height: 160,
    },
  },
  "& .FusePageSimple-rightSidebar": {
    width: 320,
  },
}));

const ExplorerApp = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();

  const project = useSelector(
    ({ explorerApp }) => explorerApp.explorer.projectData
  );

  const pageLayout = useRef(null);

  const [isFolder, setIsFolder] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const dataClient = JSON.parse(
    JSON.stringify(
      useSelector(({ globalParams }) => globalParams.generalParams.newPO.client)
    )
  );

  const findMainProject = (params) => {
    if (params.folder === "folder") {
      dispatch(getFindFolder(params)).then((result) => {
        if (result.payload.projectId === null) {
          findMainProject({ id: result.payload.folderId, folder: "folder" });
        } else {
          dispatch(
            getFindProject({ id: result.payload.projectId, folder: "project" })
          ).then((resultFP) => {
            dispatch(handleProjectDataFind(resultFP.payload));
          });
        }
      });
    }
  };

  useEffect(() => {

    if (routeParams && routeParams.folder == "folder") {
      setIsFolder(true);
      dispatch(getCurrentFolder({ routeParams, isFolder: true }));
      findMainProject(routeParams);
    } else {
      setIsFolder(false);
      dispatch(getCurrentFolder({ routeParams, isFolder: false }));
    }
    dispatch(getDocumentTypes());
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (project && project.name) {
      setCurrentUrl(project.name);
    }

    if (dataClient.id !== 0 && dataClient.name !== "") {
      dispatch(changeGeneralParamsNewPOClient({ id: 0, name: "" }));
    }
  }, [project]);

  const handleAdd = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleAddNewFolder = () => {
    dispatch(handleNewFolderDialog());
    setOpen(!open);
  };

  const handleAddNewFile = () => {
    dispatch(handleNewFileDialog());
    setOpen(!open);
  };

  const handleRedirectNewPO = () => {
    dispatch(changeGeneralParamsNewPOClient(project));
    dispatch(changeDatosPOs(dataPO));
    navigate("/apps/po/po-general-template");
  };

  return (
    <>
      <Root
        header={
          <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
            <div className="flex items-center justify-between">
              <IconButton
                onClick={(ev) => {
                  pageLayout.current.toggleLeftSidebar();
                }}
                aria-label="open left sidebar"
                size="large"
              >
                <Icon>menu</Icon>
              </IconButton>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.2 } }}
              >
                <IconButton
                  aria-label="search"
                  size="large"
                  onClick={(ev) => {
                    navigate("/apps/search");
                  }}
                >
                  <Icon>search</Icon>
                </IconButton>
              </motion.div>
            </div>
            <Popper
              id={"simple-popover"}
              open={open}
              anchorEl={anchorEl}
              onClose={handleAdd}
              placement={"bottom-start"}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <ListItemButton onClick={() => handleAddNewFolder()}>
                        <ListItemIcon>
                          <Icon>folder</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Add Folder" />
                      </ListItemButton>
                      <ListItemButton onClick={() => handleAddNewFile()}>
                        <ListItemIcon>
                          <Icon>note_add</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Add File" />
                      </ListItemButton>
                      <ListItemButton onClick={handleRedirectNewPO}>
                        <ListItemIcon>
                          <Icon>post_add</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Add New PO" />
                      </ListItemButton>
                    </List>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <div className="flex flex-1 items-end">
              <Fab
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.6 } }}
                color="secondary"
                aria-label="add"
                className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
              >
                <IconButton onClick={handleAdd} aria-label="search">
                  <Icon>add</Icon>
                </IconButton>
              </Fab>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
              >
                {currentUrl && (
                  <Breadcrumb
                    selected={currentUrl}
                    className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24 font-semibold"
                  />
                )}
              </motion.div>
            </div>
          </div>
        }
        content={<FileList pageLayout={pageLayout} />}
        leftSidebarVariant="temporary"
        leftSidebarHeader={<MainSidebarHeader />}
        leftSidebarContent={<MainSidebarContent />}
        rightSidebarHeader={<RightSideBarHeader />}
        rightSidebarContent={<RightSideBarContent />}
        ref={pageLayout}
        innerScroll
      />
      <NewFolderDialog />
      <NewFileDialog />
    </>
  );
};

export default withReducer("explorerApp", reducer)(ExplorerApp);
