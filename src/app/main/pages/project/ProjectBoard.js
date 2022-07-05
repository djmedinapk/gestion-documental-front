import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProjects,
  handleDialog,
  selectProjects,
} from "./store/projectsSlice";
import reducer from "./store";
import ProjectDialog from "./ProjectDialog";
import DeleteProjectDialog from "./DeleteProjectDialog";
import {
  handleDeleteProjectDialog,
  removeProject,
} from "./store/projectsSlice";
import { useTranslation } from "react-i18next";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { showMessage } from "app/store/fuse/messageSlice";

const Root = styled("div")(({ theme }) => ({
  "& .board": {
    transitionProperty: "box-shadow border-color",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const { t } = useTranslation("projectPage");

  const [projectDataRemove, setProjectDataRemove] = useState(null);

  useEffect(() => {
    dispatch(getProjects());
    //   return () => {
    //     dispatch(resetBoards());
    //   };
  }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleDeleteProject = (project) => {
    setProjectDataRemove(project);
    dispatch(handleDeleteProjectDialog());
  };

  const handleDeleteProjectFunction = () => {
    if (projectDataRemove && projectDataRemove.id) {
      dispatch(removeProject(projectDataRemove.id)).then(() => {
        dispatch(getProjects());
        dispatch(
          showMessage({
            message: t("PROJECT_DELETED"),
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            variant: "success",
          })
        );
      });
    }
  };

  return (
    <>
      <Root className="flex grow shrink-0 flex-col items-center">
        <div className="flex grow shrink-0 flex-col items-center container px-16 md:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            <Typography
              className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-bold"
              color="inherit"
            >
              {t("PROJECTS")}
            </Typography>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap w-full justify-center py-32 px-16"
          >
            {projects.map((project) =>
              project.deletedAt === null ? (
                <motion.div
                  variants={item}
                  className="w-224 h-224 p-16"
                  key={project.id}
                >
                  <Tooltip
                    title={t("DELETE_PROJECT")}
                    placement="top"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <IconButton
                      onClick={() => handleDeleteProject(project)}
                      color="error"
                      aria-label="search"
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </Tooltip>
                  <Paper
                    to={`/explorer/project/${project.id}`}
                    className="board flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg cursor-pointer"
                    role="button"
                    component={Link}
                  >
                    <Icon className="text-56" color="action">
                      assessment
                    </Icon>
                    <Typography
                      className="text-16 font-medium text-center pt-16 px-32"
                      color="inherit"
                    >
                      {project.name}
                    </Typography>
                  </Paper>
                </motion.div>
              ) : (
                false
              )
            )}
            <motion.div variants={item} className="w-224 h-224 p-16">
              <div>
                <Tooltip
                  title={t("ADD_NEW_PROJECT")}
                  placement="top"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <IconButton color="primary" aria-label="search">
                    <Icon>info</Icon>
                  </IconButton>
                </Tooltip>
              </div>
              <Paper
                className="flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg outline-none cursor-pointer"
                onClick={() => dispatch(handleDialog())}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <Icon className="text-56" color="secondary">
                  add_circle
                </Icon>
                <Typography
                  className="text-16 font-medium text-center pt-16 px-32"
                  color="inherit"
                >
                  {t("ADD_NEW_PROJECT")}
                </Typography>
              </Paper>
            </motion.div>
          </motion.div>
        </div>
      </Root>
      <ProjectDialog />
      <DeleteProjectDialog
        handleDeleteProjectFunction={handleDeleteProjectFunction}
      />
    </>
  );
};

export default withReducer("projectApp", reducer)(ProjectBoard);
