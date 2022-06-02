import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  getCurrentFolder,
  getFiles,
  handleNewFileDialog,
  handleEditFolderDialog,
  handleEditFileDialog,
  selectFiles,
  getFindFolder,
  getFindProject,
  handleProjectDataFind,
} from "./store/explorerSlice";

function RightSideBarHeader(props) {
  const dispatch = useDispatch();

  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const { t } = useTranslation("searchPage");

  const [open, setOpen] = useState(false);

  if (!selectedItem) {
    return null;
  }

  const handleEditFolder = () => {
    dispatch(handleEditFolderDialog());
    setOpen(!open);
  };

  const handleEditFile = () => {
    dispatch(handleEditFileDialog());
    setOpen(!open);
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 sm:p-12">
      <div className="toolbar flex align-center justify-end">
        {selectedItem.type !== "folder" ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
            >
              <IconButton size="large">
                <Icon>delete</Icon>
              </IconButton>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
            >
              <IconButton size="large">
                <Icon>cloud_download</Icon>
              </IconButton>
            </motion.div>
          </>
        ) : (
          false
        )}
        {selectedItem.type === "folder" ? (
          selectedItem.name !== ".." ? (
            // <IconButton size="large" onClick={() => handleEditFolder()}>
            //   <Icon>edit</Icon>
            // </IconButton>
            false
          ) : (
            false
          )
        ) : (
          <IconButton size="large" onClick={() => handleEditFile()}>
            <Icon>edit</Icon>
          </IconButton>
        )}
      </div>

      <div className="p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
        >
          <Typography variant="subtitle1" className="mb-8 font-semibold">
            {selectedItem.name}
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}

export default RightSideBarHeader;
