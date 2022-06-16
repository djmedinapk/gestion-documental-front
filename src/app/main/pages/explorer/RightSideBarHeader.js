import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  handleEditFolderDialog,
  handleEditFileDialog,
  handleDeleteFileDialog,
} from "./store/explorerSlice";

import { dataPO } from "./../po/store/Params";
import {
  changeDatosPOs,
  getPOById,
} from "./../po/store/poEditGeneralTemplateSlice";

import { changeGeneralParamsEditPO } from "./../../../store/globalParamsSlice";

function RightSideBarHeader(props) {
  const dispatch = useDispatch();

  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const { t } = useTranslation("explorerPage");

  const navigate = useNavigate();

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

  const handleDeleteFile = () => {
    dispatch(handleDeleteFileDialog());
    setOpen(!open);
  };

  const handleEditPO = () => {
    dispatch(
      changeGeneralParamsEditPO({
        id: selectedItem.metadata.id,
        name: selectedItem.metadata.name,
      })
    );
    dispatch(getPOById({ idFolderPO: selectedItem.metadata.id })).then(
      (resultPOE) => {
        let dataUp = JSON.parse(JSON.stringify(dataPO));
        if (dataUp.name === "") {
          dispatch(
            changeDatosPOs(searchInfoEditPO(dataUp, resultPOE.payload.data))
          );
          navigate("/apps/po/po-edit-general-template");
        }
      }
    );
  };

  const searchInfoEditPO = (dataUp, resultPOE) => {
    dataUp.name = resultPOE.name;
    if (resultPOE.stateDbPO !== null) {
      dataUp.statePO = resultPOE.StateDbPO;
    }
    if (dataUp.year !== null && dataUp.year !== undefined) {
      dataUp.year = resultPOE.year;
      dataUp.month = resultPOE.month;
      dataUp.productType = resultPOE.productType;
      dataUp.client.id = resultPOE.client.id;
      dataUp.client.name = resultPOE.client.name;
    }
    dataUp.folders.forEach((elementFolder) => {
      resultPOE.folders.forEach((elementResultFolder) => {
        if (elementFolder.name === elementResultFolder.name) {
          if (elementFolder.folders.length !== 0) {
            elementFolder = searchInfoEditPO(
              elementFolder,
              elementResultFolder
            );
          }

          elementFolder.files.forEach((elementFile) => {
            elementResultFolder.files.forEach((elementResultFile) => {
              if (
                elementFile.documentType.name ===
                elementResultFile.documentType.name
              ) {
                elementFile.id = elementResultFile.id;
                elementFile.contentFile.name = elementResultFile.name;
                elementFile.documentType.id = elementResultFile.documentType.id;
                elementFile.documentType.name =
                  elementResultFile.documentType.name;
              }
            });
          });
        }
      });
    });

    return dataUp;
  };

  const searchFoldersInfoEditPO = (folder) => {};

  return (
    <div className="flex flex-col justify-between h-full p-4 sm:p-12">
      <div className="toolbar flex align-center justify-end">
        {selectedItem.type !== "folder" ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
            >
              <IconButton size="large" onClick={() => handleDeleteFile()}>
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
          selectedItem.metadata?.isPO === true ? (
            <Tooltip
              title={t("EDIT_PO")}
              placement="bottom"
              arrow
              TransitionComponent={Zoom}
            >
              <IconButton size="large" onClick={() => handleEditPO()}>
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
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
