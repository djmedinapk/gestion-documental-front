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
  downloadFile,
} from "./../po/store/poEditGeneralTemplateSlice";

import { changeGeneralParamsEditPO } from "./../../../store/globalParamsSlice";
import { result } from "lodash";

function RightSideBarHeader(props) {
  const dispatch = useDispatch();

  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const { t } = useTranslation("explorerPage");

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [buttonEditPO, setButtonEditPO] = useState(false);

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
          let originalData = searchInfoEditPO(dataUp, resultPOE.payload.data);
          let originalDataWithNew = searchInfoEditPONew(
            originalData,
            resultPOE.payload.data,
            originalData.name,
            originalData.name
          );

          dispatch(changeDatosPOs(originalDataWithNew));

          setButtonEditPO(true);
          setTimeout(() => {
            navigate("/apps/po/po-edit-general-template");
          }, 1200);
        }
      }
    );
  };

  const searchInfoEditPONew = (dataUp, resultPOE, route, namePO) => {
    if (route !== namePO + "/UVA/Evidencias") {
      resultPOE.files.forEach((elementFiles) => {
        if (elementFiles.stateDbPO === "new") {
          var dataFilePush = {
            id: elementFiles.id,
            name: elementFiles.name,
            statePO: elementFiles.stateDbPO,
            stateRequired: false,
            foldersRepeated: [],
            documentType: elementFiles.documentType,
            contentFile: {
              name: elementFiles.name,
              lastModified: 0,
              lastModifiedDate: null,
              size: 0,
              type: "",
            },
          };
          dataUp.files.push(dataFilePush);
        }
      });

      resultPOE.folders.forEach((elementResultFolder) => {
        if (elementResultFolder.stateDbPO === "new") {
          var dataFolderPush = {
            id: elementResultFolder.id,
            name: elementResultFolder.name,
            statePO: elementResultFolder.stateDbPO,
            accordionState: elementResultFolder.name,
            addSourceState: { state: "", nameFolder: "" },
            files: [],
            folders: [],
          };

          if (elementResultFolder.folders.length !== 0) {
            dataFolderPush = searchInfoEditPONew(
              dataFolderPush,
              elementResultFolder,
              route + "/" + dataFolderPush.name,
              namePO
            );
          } else {
            elementResultFolder.files.forEach((elementFilesRes) => {
              var dataFilePushRes = {
                id: elementFilesRes.id,
                name: elementFilesRes.name,
                statePO: elementFilesRes.stateDbPO,
                stateRequired: false,
                foldersRepeated: [],
                documentType: elementFilesRes.documentType,
                contentFile: {
                  name: elementFilesRes.name,
                  lastModified: 0,
                  lastModifiedDate: null,
                  size: 0,
                  type: "",
                },
              };
              dataFolderPush.files.push(dataFilePushRes);
            });
          }

          dataUp.folders.push(dataFolderPush);
        } else if (elementResultFolder.stateDbPO === "old") {
          dataUp.folders.forEach((elementdataUpFolderOld) => {
            if (
              elementdataUpFolderOld.name === elementResultFolder.name &&
              elementdataUpFolderOld.statePO === "old"
            ) {
              elementdataUpFolderOld = searchInfoEditPONew(
                elementdataUpFolderOld,
                elementResultFolder,
                route + "/" + elementdataUpFolderOld.name,
                namePO
              );
            }
          });
        }
      });
    } else {
      resultPOE.folders.forEach((elementResultFolder) => {
        var nameProduct = elementResultFolder.name.split("-");

        var productPO = {
          id: elementResultFolder.id,
          name: nameProduct[0],
          tempName: nameProduct[0],
          model: nameProduct[1],
          statePO: "new",
          files: [],
        };

        elementResultFolder.files.forEach((fileProductElement) => {
          var dataFileProductPush = {
            id: fileProductElement.id,
            name: fileProductElement.name,
            statePO: fileProductElement.stateDbPO,
            stateRequired: false,
            foldersRepeated: [],
            documentType: fileProductElement.documentType,
            contentFile: {
              name: fileProductElement.name,
              lastModified: 0,
              lastModifiedDate: null,
              size: 0,
              type: "",
            },
          };
          productPO.files.push(dataFileProductPush);
        });
        dataUp.products.push(productPO);
      });
    }

    return dataUp;
  };

  const searchInfoEditPO = (dataUp, resultPOE) => {
    dataUp.id = resultPOE.id;
    dataUp.name = resultPOE.name;
    if (resultPOE.stateDbPO !== null && resultPOE.stateDbPO !== "") {
      dataUp.statePO = resultPOE.stateDbPO;
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
        if (
          elementFolder.name === elementResultFolder.name &&
          elementResultFolder.stateDbPO === "old"
        ) {
          elementFolder.id = elementResultFolder.id;
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
                  elementResultFile.documentType.name &&
                elementResultFile.stateDbPO === "old"
              ) {
                if (
                  elementResultFile.stateDbPO !== null &&
                  elementResultFile.stateDbPO !== ""
                ) {
                  elementFile.statePO = elementResultFile.stateDbPO;
                }
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

  const downloadF = () => {
    dispatch(
      downloadFile({
        id: selectedItem.metadata.id,
        name: selectedItem.metadata.name,
        url: selectedItem.metadata.url,
      })
    ).then((res) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = res.payload.data.urlFile;
      a.download = res.payload.data.name;
      a.click();
    });
  };

  const watchF = () => {
    dispatch(
      downloadFile({
        id: selectedItem.metadata.id,
        name: selectedItem.metadata.name,
        url: selectedItem.metadata.url,
      })
    ).then((res) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = res.payload.data.urlFile;
      a.target = "_blank";
      a.click();
    });
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
              <IconButton size="large" onClick={() => handleDeleteFile()}>
                <Icon>delete</Icon>
              </IconButton>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
            >
              <IconButton size="large" onClick={() => downloadF()}>
                <Icon>cloud_download</Icon>
              </IconButton>
              {selectedItem.type === "image" ||
              selectedItem.type === "pdf" ||
              selectedItem.type === "xml" ? (
                <IconButton size="large" onClick={() => watchF()}>
                  <Icon>find_in_page</Icon>
                </IconButton>
              ) : (
                false
              )}
            </motion.div>
          </>
        ) : (
          false
        )}

        {selectedItem.type === "folder" ? (
          <>
            {selectedItem.name !== ".." ? (
              <>
                <Tooltip
                  title={t("EDIT_FOLDER")}
                  placement="bottom"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <IconButton size="large" onClick={() => handleEditFolder()}>
                    <Icon>edit</Icon>
                  </IconButton>
                </Tooltip>

                {selectedItem.metadata?.isPO === true ? (
                  <Tooltip
                    title={t("EDIT_PO")}
                    placement="bottom"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <IconButton
                      size="large"
                      disabled={buttonEditPO}
                      onClick={() => handleEditPO()}
                    >
                      <Icon>article</Icon>
                    </IconButton>
                  </Tooltip>
                ) : (
                  false
                )}
              </>
            ) : (
              false
            )}
          </>
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
          {selectedItem.name !== ".." ? (
            <Typography variant="subtitle1" className="mb-8 font-semibold">
              {selectedItem.name}
            </Typography>
          ) : (
            <Typography variant="subtitle1" className="mb-8 font-semibold">
              {t("RETURN")}
            </Typography>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default RightSideBarHeader;
