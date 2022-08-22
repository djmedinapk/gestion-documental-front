import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext, useForm } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";

import AcordionComponent from "./AcordionComponent";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDeepCompareEffect } from "@fuse/hooks";

import { hideMessage, showMessage } from "app/store/fuse/messageSlice";

import {
  changeDatosPOs,
  fileUp,
  folderUp,
  removeFolder,
  updateFile,
  folderCreateSystemUp,
  getFoldersValidateUp,
  editFolderPO,
  removeFile,
  downloadFile,
} from "./../../store/poEditGeneralTemplateSlice";
import { selectProductTypesEditPO } from "./../../store/productTypesAdminSlice";
import { selectDocumentTypesEditPO } from "./../../store/documentTypesAdminSlice";
//import { selectDataEditPO } from "./../../store/poEditGeneralTemplateSlice";

import { months, currentYear, dataPO } from "./../../store/Params";
import { Done } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const EditPOTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("poPage");

  var datosSS = JSON.parse(
    JSON.stringify(
      useSelector(
        ({ poEditGeneralTemplateApp }) =>
          poEditGeneralTemplateApp.poEditGeneralTemplate.datosPOs
      )
    )
  );

  const dataMainEditPO = JSON.parse(
    JSON.stringify(
      useSelector(({ globalParams }) => globalParams.generalParams.editPO)
    )
  );

  const dataClient = JSON.parse(
    JSON.stringify(
      useSelector(({ globalParams }) => globalParams.generalParams.newPO.client)
    )
  );

  var finalFile = { name: "", route: "", isPO: false };
  var finalFileProducts = { name: "", route: "" };
  var finalFolder = { name: "", route: "" };
  var finalFileRepeated = { name: "", route: "" };

  const [continueValidationSaveByFiles, setContinueValidationSaveByFiles] =
    useState(false);
  const [
    continueValidationSaveByFilesProducts,
    setContinueValidationSaveByFilesProducts,
  ] = useState(false);
  const [continueValidationSaveByFolders, setContinueValidationSaveByFolders] =
    useState(false);

  const [
    continueValidationSaveByFilesRepeated,
    setContinueValidationSaveByFilesRepeated,
  ] = useState(false);

  const [continueValidationFilesDeleted, setContinueValidationFilesDeleted] =
    useState(false);
  const [
    continueValidationFoldersDeleted,
    setContinueValidationFoldersDeleted,
  ] = useState(false);
  const [continueValidationFolderUVAEdit, setContinueValidationFolderUVAEdit] =
    useState(false);

  const [idParentFolderCVS, setIdParentFolderCVS] = useState(0);

  //const filesGeneral = JSON.parse(JSON.stringify(datosSS));

  const [chooseFilesDataUpload, setChooseFilesDataUpload] = useState([]);

  const datosProductTypes = useSelector(selectProductTypesEditPO);

  const datosDocumentTypes = useSelector(selectDocumentTypesEditPO);

  // const datosPOEditMethod = useSelector(selectDataEditPO);

  const [dataYears, setDataYears] = useState([]);

  const [validateButtonSave, setValidateButtonSave] = useState(false);

  const [validateReturn, setValidateReturn] = useState(false);

  //validation

  const defaultValues = {
    namePO: "",
    pediment: "",
    year: "",
    month: "",
    type: "",
  };

  const schema = yup.object().shape({
    namePO: yup.string().required(t("YOU_MUST_ENTER_A") + " " + t("NAME_PO")),
    pediment: yup
      .string()
      .required(t("YOU_MUST_ENTER_A") + " " + t("PEDIMENT")),
    year: yup.string().required(t("YOU_MUST_SELECT_A") + " " + t("YEAR")),
    month: yup.string().required(t("YOU_MUST_SELECT_A") + " " + t("MONTH")),
    type: yup
      .string()
      .required(t("YOU_MUST_SELECT_A") + " " + t("PRODUCT_TYPE")),
  });

  const { control, formState } = useForm({
    mode: "onChange",
    validationSchema: defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [idFilesDelete, setIdFilesDelete] = useState([]);
  const [idFoldersDelete, setIdFoldersDelete] = useState([]);
  const [folderUVAEdit, setFolderUVAEdit] = useState({ id: 0, name: "" });

  const [urlValidationUVAEvidencias, setUrlValidationUVAEvidencias] =
    useState("");

  //--------------------------------

  useDeepCompareEffect(() => {
    if (dataMainEditPO.id === 0 && dataMainEditPO.name === "") {
      navigate("/projects");
    }
    setDataYears(getYearsData());
  }, [dispatch, datosProductTypes, datosDocumentTypes]);

  useEffect(() => {
    if (datosDocumentTypes.length !== 0) {
      datosSS = documentTypesAsingJsonDatosSS(
        JSON.parse(JSON.stringify(datosSS))
      );
      setFilesGeneral(
        documentTypesAsingJsonDatosSS(JSON.parse(JSON.stringify(datosSS)))
      );
      handleUpdate();
      if (
        datosSS.pediment != null &&
        datosSS.pediment != undefined &&
        datosSS.pediment != ""
      ) {
        datosSS.folders.forEach((element) => {
          if (element.name.split(" ")[0] === "UVA") {
            setUrlValidationUVAEvidencias("/" + element.name + "/Evidencias");
          }
        });
      } else {
        setUrlValidationUVAEvidencias("/UVA/Evidencias");
      }
    }
  }, [datosDocumentTypes]);

  useEffect(() => {
    if (
      continueValidationSaveByFiles === true &&
      continueValidationSaveByFilesProducts === true &&
      continueValidationSaveByFolders === true
    ) {
      setContinueValidationSaveByFiles(false);
      setContinueValidationSaveByFilesProducts(false);
      setContinueValidationSaveByFolders(false);
      if (finalFileRepeated.name === "") {
        setContinueValidationSaveByFilesRepeated(true);
      }
      uploadFilesRepeated(datosSS, datosSS.id, filesGeneral);
    }
  }, [
    continueValidationSaveByFiles,
    continueValidationSaveByFilesProducts,
    continueValidationSaveByFolders,
  ]);

  useEffect(() => {
    if (continueValidationSaveByFilesRepeated === true) {
      setContinueValidationSaveByFilesRepeated(false);
      var sizeFiles = 0;
      idFilesDelete.forEach((element) => {
        sizeFiles = sizeFiles + 1;
      });
      deleteFilesDB(0, sizeFiles);
    }
    if (continueValidationFilesDeleted === true) {
      setContinueValidationFilesDeleted(false);
      var sizeFolders = 0;
      idFoldersDelete.forEach((element) => {
        sizeFolders = sizeFolders + 1;
      });
      deleteFoldersDB(0, sizeFolders);
    }
    if (continueValidationFoldersDeleted === true) {
      setContinueValidationFoldersDeleted(false);
      editFolderUVADB();
    }
    if (continueValidationFolderUVAEdit === true) {
      setContinueValidationFolderUVAEdit(false);
      setTimeout(function () {
        messageDispatch(t("THE_PO_WAS_UPDATED"), "success");
        navigate("/explorer/folder/" + datosSS.id);
      }, 1000);
    }
  }, [
    continueValidationSaveByFilesRepeated,
    continueValidationFilesDeleted,
    continueValidationFoldersDeleted,
    continueValidationFolderUVAEdit,
  ]);

  const deleteFilesDB = (index, size) => {
    if (index < size) {
      dispatch(removeFile(idFilesDelete[index].id)).then((res) => {
        deleteFilesDB(index + 1, size);
      });
    } else if (index === size) {
      setContinueValidationFilesDeleted(true);
    }
  };

  const deleteFoldersDB = (index, size) => {
    if (index < size) {
      dispatch(removeFolder(idFoldersDelete[index].id)).then((res) => {
        deleteFoldersDB(index + 1, size);
      });
    } else if (index === size) {
      setContinueValidationFoldersDeleted(true);
    }
  };
  const editFolderUVADB = () => {
    if (
      folderUVAEdit.id !== undefined &&
      folderUVAEdit.id !== null &&
      folderUVAEdit.id !== 0
    ) {
      dispatch(
        editFolderPO({ id: folderUVAEdit.id, name: folderUVAEdit.name })
      ).then((res) => {
        setContinueValidationFolderUVAEdit(true);
      });
    } else {
      setContinueValidationFolderUVAEdit(true);
    }
  };

  const documentTypesAsingJsonDatosSS = (dataE) => {
    dataE.folders.forEach((folder, iFolder) => {
      folder.files.forEach((file, iFile) => {
        if (datosDocumentTypes.length !== 0) {
          datosDocumentTypes[0].data.forEach((documentTypeTemp) => {
            if (file.documentType.name === documentTypeTemp.name) {
              file.documentType = documentTypeTemp;
            }
          });
        }
      });
      if (folder.folders.length !== 0) {
        dataE.folders[iFolder] = documentTypesAsingJsonDatosSS(folder);
      }
    });
    return dataE;
  };

  const [filesGeneral, setFilesGeneral] = useState(null);

  useEffect(() => {
    setFilesGeneral(JSON.parse(JSON.stringify(datosSS)));
  }, []);

  const handleUpdate = () => {
    dispatch(changeDatosPOs(datosSS));
  };

  const chooseFilesProductFolder = (
    files,
    indexFolder,
    indexProduct,
    product
  ) => {
    setFiles(files);
    handleUpdate();
  };

  const setFiles = (files) => {
    setChooseFilesDataUpload([...chooseFilesDataUpload, ...files]);
  };

  const chooseFile = (event, indexFile) => {
    setChooseFilesDataUpload({
      ...chooseFilesDataUpload,
      [Object.keys(chooseFilesDataUpload).length + ""]: event,
    });
    datosSS.files[indexFile].contentFile.name = event.name;
    datosSS.files[indexFile].contentFile.lastModified = event.lastModified;
    datosSS.files[indexFile].contentFile.lastModifiedDate =
      event.lastModifiedDate;
    datosSS.files[indexFile].contentFile.size = event.size;
    datosSS.files[indexFile].contentFile.type = event.type;
    filesGeneral.files[indexFile].contentFile = event;
    handleUpdate();
  };

  const handleAdd = () => {
    if (datosSS.addSourceState.state === "folder") {
      if (datosSS.addSourceState.nameFolder !== "") {
        if (
          !validationFolderName(
            datosSS.folders,
            datosSS.addSourceState.nameFolder
          )
        ) {
          datosSS.folders.push({
            name: datosSS.addSourceState.nameFolder,
            statePO: "new",
            accordionState: datosSS.addSourceState.nameFolder,
            addSourceState: { state: "", nameFolder: "" },
            files: [],
            folders: [],
          });
          datosSS.addSourceState.state = "";
          datosSS.addSourceState.nameFolder = "";

          filesGeneral.folders.push({
            name: datosSS.addSourceState.nameFolder,
            statePO: "new",
            accordionState: datosSS.addSourceState.nameFolder,
            addSourceState: { state: "", nameFolder: "" },
            files: [],
            folders: [],
          });

          filesGeneral.addSourceState.state = "";
          filesGeneral.addSourceState.nameFolder = "";

          handleUpdate();
        } else {
          messageDispatch(t("THE_FOLDER_NAME_ALREADY_EXISTS"), "error");
        }
      } else {
        messageDispatch(
          t("YOU_MUST_ENTER_A") + " " + t("FOLDER_NAME"),
          "error"
        );
      }
    } else if (datosSS.addSourceState.state === "file") {
      datosSS.files.push({
        name: "New File",
        statePO: "new",
        stateRequired: false,
        foldersRepeated: [],
        documentType: {
          id: 3,
          name: "",
          description: "",
          regex: "",
          code: "",
          icon: "",
          extensionAllowed: "",
          lastUpdated: "",
        },
        contentFile: {
          name: "",
          lastModified: 0,
          lastModifiedDate: null,
          size: 0,
          type: "",
        },
      });

      filesGeneral.files.push({
        name: "New File",
        statePO: "new",
        stateRequired: false,
        foldersRepeated: [],
        documentType: {
          id: 3,
          name: "",
          description: "",
          regex: "",
          code: "",
          icon: "",
          extensionAllowed: "",
          lastUpdated: "",
        },
        contentFile: {
          name: "",
          lastModified: 0,
          lastModifiedDate: null,
          size: 0,
          type: "",
        },
      });

      datosSS.addSourceState.state = "";
      filesGeneral.addSourceState.state = "";

      handleUpdate();
    }
  };

  const handleRemoveFile = (indexFile) => {
    datosSS.files.splice(indexFile, 1);
    filesGeneral.files.splice(indexFile, 1);
    handleUpdate();
  };

  function handleAddSourceState(ev) {
    datosSS.addSourceState.state = ev.target.value;
    handleUpdate();
  }

  const onChangeTextNewFolder = (ev) => {
    datosSS.addSourceState.nameFolder = ev.target.value;
    filesGeneral.addSourceState.nameFolder = ev.target.value;
    //handleUpdate();
  };

  const handleNamePOState = (ev) => {
    datosSS.name = ev.target.value;
    filesGeneral.name = ev.target.value;
    //handleUpdate();
  };

  const handlePedimentPOState = (ev) => {
    datosSS.pediment = ev.target.value;
    filesGeneral.pediment = ev.target.value;
    filesGeneral.folders.forEach((element) => {
      if (element.name.split(" ")[0] === "UVA") {
        if (ev.target.value !== "") {
          setFolderUVAEdit({ id: element.id, name: "UVA " + ev.target.value });
        } else {
          setFolderUVAEdit({ id: element.id, name: "UVA" });
        }
      }
    });
    handleUpdate();
  };

  const handleProductTypePOState = (ev) => {
    datosSS.productType = ev.target.value;
    handleUpdate();
  };

  const handleMonthPOState = (ev) => {
    datosSS.month = ev.target.value;
    handleUpdate();
  };

  const handleYearPOState = (ev) => {
    datosSS.year = ev.target.value;
    handleUpdate();
  };

  const handleDocumentTypeState = (ev) => {
    var documentsTypes = datosDocumentTypes[0].data;

    datosSS.files[ev.target.name].documentType.name = ev.target.value;

    documentsTypes.forEach((documentTypeElement) => {
      if (documentTypeElement.name === ev.target.value) {
        datosSS.files[ev.target.name].documentType = documentTypeElement;
        filesGeneral.files[ev.target.name].documentType = documentTypeElement;
      }
    });

    handleUpdate();
  };

  const getYearsData = () => {
    const years = [];

    for (let index = currentYear; index > currentYear - 5; index--) {
      years.push({ name: index });
    }

    return years;
  };

  const messageDispatch = (messageD, variantD) => {
    dispatch(
      showMessage({
        message: messageD,
        autoHideDuration: 3000, //ms
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: variantD,
      })
    );
  };

  const validationFolderName = (folders, nameNewFolder) => {
    var validationReturn = false;

    folders.forEach((folderElement) => {
      if (folderElement.name === nameNewFolder) {
        validationReturn = true;
      }
    });

    return validationReturn;
  };

  const validationFilesStorage = (dataVFS) => {
    var validationReturn = true;

    dataVFS.files.forEach((fileElement) => {
      if (
        fileElement.contentFile.name === "" &&
        fileElement.stateRequired === true
      ) {
        messageDispatch(
          t("YOU_MUST_SELECT_FILE") +
            ": " +
            dataVFS.name +
            " - " +
            fileElement.documentType.name,
          "error"
        );
        validationReturn = false;
      }
    });

    dataVFS.folders.forEach((folderElement) => {
      if (validationReturn) {
        validationReturn = validationFilesStorage(folderElement);
      }
    });

    return validationReturn;
  };

  const validationDocumentTypeFilesStorage = (dataVDTFS) => {
    var validationReturn = true;
    dataVDTFS.files.forEach((fileElement) => {
      if (fileElement.documentType.name === "") {
        validationReturn = false;
      }
    });

    dataVDTFS.folders.forEach((folderElement) => {
      if (validationReturn) {
        validationReturn = validationDocumentTypeFilesStorage(folderElement);
      }
    });

    return validationReturn;
  };

  const validationFolderEvidencesUVA = (dataVDTFS) => {
    var validationReturnP = true;
    dataVDTFS.folders.forEach((folderElement) => {
      if (folderElement.name === "UVA") {
        folderElement.folders.forEach((folderUVAElement) => {
          if (folderUVAElement.name === "Evidencias") {
            folderUVAElement.products.forEach(
              (productElement, iProductElement) => {
                if (productElement.tempName === "") {
                  validationReturnP = false;
                  messageDispatch(
                    t("YOU_MUST_ENTER_A") + "Product Name",
                    "error"
                  );
                } else if (productElement.model === "") {
                  validationReturnP = false;
                  messageDispatch(
                    t("YOU_MUST_ENTER_A") + "Product Model",
                    "error"
                  );
                } else if (productElement.files.length === 0) {
                  validationReturnP = false;
                  messageDispatch(
                    t("YOU_MUST_SELECT_THE_PRODUCT_FILES"),
                    "error"
                  );
                }

                folderUVAElement.products.forEach(
                  (productValidationElement, iProductValidationElement) => {
                    if (
                      productValidationElement.tempName +
                        "-" +
                        productValidationElement.model ===
                        productElement.tempName + "-" + productElement.model &&
                      iProductValidationElement !== iProductElement
                    ) {
                      validationReturnP = false;
                      messageDispatch(
                        t("THE_PRODUCT_IN_THE_EVIDENCE_FOLDER_ALREADY_EXISTS"),
                        "error"
                      );
                    }
                  }
                );
              }
            );
          }
        });
      }
    });
    return validationReturnP;
  };

  const findIdFolderInsider = (
    nameFolderVI,
    folderIdVI,
    indexVI,
    dataTotalVI,
    fileVI,
    routeVI
  ) => {
    dispatch(
      getFoldersValidateUp({
        Name: nameFolderVI[indexVI],
        FolderId: folderIdVI,
      })
    ).then((resultCadenaV) => {
      if (indexVI < dataTotalVI - 1) {
        findIdFolderInsider(
          nameFolderVI,
          resultCadenaV.payload.data.data[0].id,
          indexVI + 1,
          dataTotalVI,
          fileVI,
          routeVI + "/" + nameFolderVI[indexVI]
        );
      } else {
        var datosGeneralFVI = new FormData();
        datosGeneralFVI.append(`name`, fileVI.contentFile.name);
        datosGeneralFVI.append(`description`, fileVI.contentFile.name);
        datosGeneralFVI.append(`documentTypeId`, fileVI.documentType.id);
        datosGeneralFVI.append(`stateDbPO`, fileVI.statePO);
        datosGeneralFVI.append(`Url`, routeVI + "/" + nameFolderVI[indexVI]);
        datosGeneralFVI.append(
          `FolderId`,
          resultCadenaV.payload.data.data[0].id
        );
        datosGeneralFVI.append(`file`, fileVI.contentFile);
        if (fileVI.contentFile.name !== "") {
          if (
            fileVI.id !== undefined &&
            fileVI.id !== null &&
            fileVI.id !== 0
          ) {
            if (fileVI.contentFile.size !== 0) {
              const datosEditFile = new FormData();
              datosEditFile.append("id", fileVI.id);
              datosEditFile.append("name", fileVI.contentFile.name);
              datosEditFile.append("nameOld", fileVI.name);
              datosEditFile.append("description", fileVI.contentFile.name);
              var urlTempp = routeVI.split("/");
              var urlPass = "";
              for (let index = 0; index < urlTempp.length; index++) {
                if (index === 0) {
                  urlPass = urlTempp[index];
                } else if (urlTempp[index] !== "") {
                  urlPass = urlPass + "\\" + urlTempp[index];
                }
              }
              datosEditFile.append("url", urlPass);
              datosEditFile.append("folderId", folderIdVI);
              datosEditFile.append("documentTypeId", fileVI.documentType.id);
              datosEditFile.append("file", fileVI.contentFile);

              dispatch(updateFile(datosEditFile));
            }
          } else {
            dispatch(fileUp(datosGeneralFVI)).then((resultUPRepeated) => {
              if (
                routeVI +
                  "/" +
                  nameFolderVI[indexVI] +
                  "/" +
                  fileVI.contentFile.name ===
                finalFileRepeated.route + "/" + finalFileRepeated.name
              ) {
                setContinueValidationSaveByFilesRepeated(true);
              }
            });
          }
        }
      }
    });
  };

  const findLastFile = (data, route, namePO) => {
    if (data.id !== undefined && data.id !== null && data.id != 0) {
    } else {
      finalFolder.name = data.name;
      finalFolder.route = route;
    }

    data.files.forEach((element) => {
      if (element.contentFile.name !== "") {
        if (
          element.id !== undefined &&
          element.id !== null &&
          element.id != 0
        ) {
        } else {
          finalFile.name = element.contentFile.name;
          finalFile.route = route;
          finalFile.isPO = true;
        }

        if (element.foldersRepeated.length !== 0) {
          element.foldersRepeated.forEach((elementRepeated) => {
            if (
              element.id !== undefined &&
              element.id !== null &&
              element.id != 0
            ) {
            } else {
              finalFileRepeated.name = element.contentFile.name;
              finalFileRepeated.route = namePO + "/" + elementRepeated.url;
            }
          });
        }
      }
    });
    var validationUVAEvidenciasUrlP = "/UVA/Evidencias";
    if (
      datosSS.pediment !== undefined &&
      datosSS.pediment !== null &&
      datosSS.pediment !== ""
    ) {
      datosSS.folders.forEach((element) => {
        if (element.name.split(" ")[0] === "UVA") {
          if (element.name.split(" ").length > 1) {
            validationUVAEvidenciasUrlP = "/" + element.name + "/Evidencias";
          }
        }
      });
    }
    if (route === namePO + validationUVAEvidenciasUrlP) {
      data.products.forEach((elementProduct) => {
        elementProduct.files.forEach((elementProductFile) => {
          if (
            elementProduct.id !== undefined &&
            elementProduct.id !== null &&
            elementProduct.id != 0
          ) {
          } else {
            finalFileProducts.name = elementProductFile.contentFile.name;
            finalFileProducts.route =
              route +
              "/" +
              elementProduct.tempName +
              "-" +
              elementProduct.model;
          }
        });
      });
    }

    data.folders.forEach((element, index) => {
      findLastFile(element, route + "/" + element.name, namePO);
    });
  };

  const uploadFilesRepeated = (
    dataPORepeated,
    folderVId,
    dataPORepeatedFiles
  ) => {
    dataPORepeated.files.forEach((fileElement, iFileElement) => {
      if (fileElement.foldersRepeated.length !== 0) {
        fileElement.foldersRepeated.forEach((elementFoldersRepeated) => {
          var arrayDeCadenas = elementFoldersRepeated.url.split("/");
          findIdFolderInsider(
            arrayDeCadenas,
            folderVId,
            0,
            arrayDeCadenas.length,
            dataPORepeatedFiles.files[iFileElement],
            dataPORepeated.name
          );
        });
      }
    });

    dataPORepeated.folders.forEach((folderElement, iFolderElement) => {
      uploadFilesRepeated(
        folderElement,
        folderVId,
        dataPORepeatedFiles.folders[iFolderElement]
      );
    });
  };

  const uploadSubFolders = (
    dataUF,
    dataUFTemp,
    idParentFolder,
    routeFolder,
    dataGeneral
  ) => {
    if (
      routeFolder ===
      dataGeneral.client.name +
        "/" +
        dataGeneral.year +
        "/" +
        dataGeneral.productType +
        "/" +
        dataGeneral.month +
        "/" +
        dataGeneral.name +
        "/"
    ) {
      dataUFTemp.files.forEach((fileElement, iFileElement) => {
        var datosGeneralF = new FormData();
        datosGeneralF.append(`name`, fileElement.contentFile.name);
        datosGeneralF.append(`description`, fileElement.contentFile.name);
        datosGeneralF.append(`documentTypeId`, fileElement.documentType.id);
        datosGeneralF.append(`stateDbPO`, fileElement.statePO);
        datosGeneralF.append(`Url`, routeFolder);
        datosGeneralF.append(`FolderId`, idParentFolder);
        datosGeneralF.append(`file`, fileElement.contentFile);
        if (fileElement.contentFile.name !== "") {
          if (
            fileElement.id !== undefined &&
            fileElement.id !== null &&
            fileElement.id !== 0
          ) {
            if (fileElement.contentFile.size !== 0) {
              const datosEditFile = new FormData();
              datosEditFile.append("id", fileElement.id);
              datosEditFile.append("name", fileElement.contentFile.name);
              datosEditFile.append("nameOld", fileElement.name);
              datosEditFile.append("description", fileElement.contentFile.name);
              var urlTempp = routeFolder.split("/");
              var urlPass = "";
              for (let index = 0; index < urlTempp.length; index++) {
                if (index === 0) {
                  urlPass = urlTempp[index];
                } else if (urlTempp[index] !== "") {
                  urlPass = urlPass + "\\" + urlTempp[index];
                }
              }
              datosEditFile.append("url", urlPass);
              datosEditFile.append("folderId", idParentFolder);
              datosEditFile.append(
                "documentTypeId",
                fileElement.documentType.id
              );
              datosEditFile.append("file", fileElement.contentFile);

              dispatch(updateFile(datosEditFile));
            }
          } else {
            dispatch(fileUp(datosGeneralF));
            if (
              finalFile.route === dataGeneral.name &&
              finalFile.name !== fileElement.name
            ) {
              setIdParentFolderCVS(idParentFolder);
              setContinueValidationSaveByFiles(true);
            }
          }
        }
      });
    }

    dataUF.folders.forEach((folderElement, iFolderElement) => {
      var folderObj = {
        name: folderElement.name,
        description: folderElement.name,
        isPO: false,
        FolderId: idParentFolder,
        UserId: dataGeneral.client.id,
        StateDbPO: folderElement.statePO,
      };

      if (
        folderElement.id !== null &&
        folderElement.id !== undefined &&
        folderElement.id !== 0
      ) {
        var desctructRouteFUP = routeFolder.split("/");
        var validationDesctructRouteFUP = "";
        desctructRouteFUP.forEach(
          (elementDesctructRouteFUP, IElementDesctructRouteFUP) => {
            if (IElementDesctructRouteFUP === 4) {
              validationDesctructRouteFUP = elementDesctructRouteFUP;
            } else {
              validationDesctructRouteFUP =
                validationDesctructRouteFUP + "/" + elementDesctructRouteFUP;
            }
          }
        );
        if (
          validationDesctructRouteFUP + folderElement.name ===
          finalFolder.route
        ) {
          setContinueValidationSaveByFolders(true);
        }
        var validationUVAEvidenciasUrlF = "/UVA/Evidencias";
        if (
          datosSS.pediment !== undefined &&
          datosSS.pediment !== null &&
          datosSS.pediment !== ""
        ) {
          datosSS.folders.forEach((element) => {
            if (element.name.split(" ")[0] === "UVA") {
              if (element.name.split(" ").length > 1) {
                validationUVAEvidenciasUrlF =
                  "/" + element.name + "/Evidencias";
              }
            }
          });
        }
        if (
          routeFolder + folderElement.name !==
          dataGeneral.client.name +
            "/" +
            dataGeneral.year +
            "/" +
            dataGeneral.productType +
            "/" +
            dataGeneral.month +
            "/" +
            dataGeneral.name +
            validationUVAEvidenciasUrlF
        ) {
          dataUFTemp.folders[iFolderElement].files.forEach(
            (fileElement, iFileElement) => {
              var datos = new FormData();
              datos.append(`name`, fileElement.contentFile.name);
              datos.append(`description`, fileElement.contentFile.name);
              datos.append(`documentTypeId`, fileElement.documentType.id);
              datos.append(`Url`, routeFolder + folderElement.name);
              datos.append(`stateDbPO`, fileElement.statePO);
              datos.append(`FolderId`, folderElement.id);
              datos.append(`file`, fileElement.contentFile);
              if (fileElement.contentFile.name !== "") {
                if (
                  fileElement.id !== null &&
                  fileElement.id !== undefined &&
                  fileElement.id !== 0
                ) {
                  if (fileElement.contentFile.size !== 0) {
                    const datosEditFile = new FormData();
                    datosEditFile.append("id", fileElement.id);
                    datosEditFile.append("name", fileElement.contentFile.name);
                    datosEditFile.append("nameOld", fileElement.name);
                    datosEditFile.append(
                      "description",
                      fileElement.contentFile.name
                    );
                    var urlTempp = routeFolder.split("/");
                    var urlPass = "";
                    for (let index = 0; index < urlTempp.length; index++) {
                      if (index === 0) {
                        urlPass = urlTempp[index];
                      } else if (urlTempp[index] !== "") {
                        urlPass = urlPass + "\\" + urlTempp[index];
                      }
                    }
                    datosEditFile.append(
                      "url",
                      urlPass + "\\" + folderElement.name
                    );
                    datosEditFile.append("folderId", folderElement.id);
                    datosEditFile.append(
                      "documentTypeId",
                      fileElement.documentType.id
                    );
                    datosEditFile.append("file", fileElement.contentFile);

                    dispatch(updateFile(datosEditFile));
                  }
                } else {
                  dispatch(fileUp(datos)).then((resultFUNR) => {
                    var desctructRoute = routeFolder.split("/");
                    var routeVTempF = "";
                    desctructRoute.forEach(
                      (elementDesctructRoute, elementDesctructRouteI) => {
                        if (elementDesctructRouteI >= 4) {
                          if (elementDesctructRouteI === 4) {
                            routeVTempF = elementDesctructRoute;
                          } else {
                            routeVTempF =
                              routeVTempF + "/" + elementDesctructRoute;
                          }
                        }
                      }
                    );

                    if (
                      routeVTempF +
                        folderElement.name +
                        "/" +
                        fileElement.contentFile.name ===
                      finalFile.route + "/" + finalFile.name
                    ) {
                      setIdParentFolderCVS(idParentFolder);
                      setContinueValidationSaveByFiles(true);
                    }
                  });
                }
              }
            }
          );
          if (folderElement.folders.length !== 0) {
            uploadSubFolders(
              folderElement,
              dataUFTemp.folders[iFolderElement],
              folderElement.id,
              routeFolder + folderElement.name + "/",
              dataGeneral
            );
          }
        } else {
          dataUFTemp.folders[iFolderElement].products.forEach(
            (productElement, iProductElement) => {
              var folderProductObj = {
                name: productElement.tempName + "-" + productElement.model,
                description:
                  productElement.tempName + "-" + productElement.model,
                isPO: false,
                FolderId: folderElement.id,
                UserId: dataGeneral.client.id,
                StateDbPO: folderElement.statePO,
              };
              if (
                productElement.id !== null &&
                productElement.id !== undefined &&
                productElement.id !== 0
              ) {
              } else {
                dispatch(folderUp(folderProductObj)).then(
                  (resultFolderProductObj) => {
                    productElement.files.forEach(
                      (fileElement, iFileElement) => {
                        var datos = new FormData();
                        datos.append(`name`, fileElement.contentFile.name);
                        datos.append(
                          `description`,
                          fileElement.contentFile.name
                        );
                        datos.append(
                          `documentTypeId`,
                          fileElement.documentType.id
                        );
                        datos.append(`stateDbPO`, fileElement.statePO);
                        datos.append(
                          `Url`,
                          routeFolder +
                            folderElement.name +
                            "/" +
                            productElement.tempName +
                            "-" +
                            productElement.model
                        );
                        datos.append(
                          `FolderId`,
                          resultFolderProductObj.payload.id
                        );
                        datos.append(`file`, fileElement.contentFile);
                        if (fileElement.contentFile.name !== "") {
                          dispatch(fileUp(datos)).then(
                            (resultFileProductValue) => {
                              var desctructRouteFileProd =
                                routeFolder.split("/");
                              var validationDesctructRouteFileProd = "";
                              desctructRouteFileProd.forEach(
                                (
                                  elementDesctructRouteFileProd,
                                  IElementDesctructRouteFileProd
                                ) => {
                                  if (IElementDesctructRouteFileProd === 4) {
                                    validationDesctructRouteFileProd =
                                      elementDesctructRouteFileProd;
                                  } else {
                                    validationDesctructRouteFileProd =
                                      validationDesctructRouteFileProd +
                                      "/" +
                                      elementDesctructRouteFileProd;
                                  }
                                }
                              );

                              if (
                                validationDesctructRouteFileProd +
                                  folderElement.name +
                                  "/" +
                                  productElement.tempName +
                                  "-" +
                                  productElement.model +
                                  "/" +
                                  fileElement.contentFile.name ===
                                finalFileProducts.route +
                                  "/" +
                                  finalFileProducts.name
                              ) {
                                setContinueValidationSaveByFilesProducts(true);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                );
              }
            }
          );
        }
      } else {
        dispatch(folderUp(folderObj)).then((result) => {
          var desctructRouteFUP = routeFolder.split("/");
          var validationDesctructRouteFUP = "";
          desctructRouteFUP.forEach(
            (elementDesctructRouteFUP, IElementDesctructRouteFUP) => {
              if (IElementDesctructRouteFUP === 4) {
                validationDesctructRouteFUP = elementDesctructRouteFUP;
              } else {
                validationDesctructRouteFUP =
                  validationDesctructRouteFUP + "/" + elementDesctructRouteFUP;
              }
            }
          );
          if (
            validationDesctructRouteFUP + folderElement.name ===
            finalFolder.route
          ) {
            setContinueValidationSaveByFolders(true);
          }
          var validationUVAEvidenciasUrlFS = "/UVA/Evidencias";
          if (
            datosSS.pediment !== undefined &&
            datosSS.pediment !== null &&
            datosSS.pediment !== ""
          ) {
            datosSS.folders.forEach((element) => {
              if (element.name.split(" ")[0] === "UVA") {
                if (element.name.split(" ").length > 1) {
                  validationUVAEvidenciasUrlFS =
                    "/" + element.name + "/Evidencias";
                }
              }
            });
          }

          if (
            routeFolder + folderElement.name !==
            dataGeneral.client.name +
              "/" +
              dataGeneral.year +
              "/" +
              dataGeneral.productType +
              "/" +
              dataGeneral.month +
              "/" +
              dataGeneral.name +
              validationUVAEvidenciasUrlFS
          ) {
            dataUFTemp.folders[iFolderElement].files.forEach(
              (fileElement, iFileElement) => {
                var datos = new FormData();
                datos.append(`name`, fileElement.contentFile.name);
                datos.append(`description`, fileElement.contentFile.name);
                datos.append(`documentTypeId`, fileElement.documentType.id);
                datos.append(`Url`, routeFolder + folderElement.name);
                datos.append(`stateDbPO`, fileElement.statePO);
                datos.append(`FolderId`, result.payload.id);
                datos.append(`file`, fileElement.contentFile);
                if (fileElement.contentFile.name !== "") {
                  if (
                    fileElement.id !== null &&
                    fileElement.id !== undefined &&
                    fileElement.id !== 0
                  ) {
                    if (fileElement.contentFile.size !== 0) {
                      const datosEditFile = new FormData();
                      datosEditFile.append("id", fileElement.id);
                      datosEditFile.append(
                        "name",
                        fileElement.contentFile.name
                      );
                      datosEditFile.append("nameOld", fileElement.name);
                      datosEditFile.append(
                        "description",
                        fileElement.contentFile.name
                      );
                      var urlTempp = routeFolder.split("/");
                      var urlPass = "";
                      for (let index = 0; index < urlTempp.length; index++) {
                        if (index === 0) {
                          urlPass = urlTempp[index];
                        } else if (urlTempp[index] !== "") {
                          urlPass = urlPass + "\\" + urlTempp[index];
                        }
                      }
                      datosEditFile.append("url", urlPass);
                      datosEditFile.append("folderId", folderElement.id);
                      datosEditFile.append(
                        "documentTypeId",
                        fileElement.documentType.id
                      );
                      datosEditFile.append("file", fileElement.contentFile);

                      dispatch(updateFile(datosEditFile));
                    }
                  } else {
                    dispatch(fileUp(datos)).then((resultFUNR) => {
                      var desctructRoute = routeFolder.split("/");
                      var routeVTempF = "";
                      desctructRoute.forEach(
                        (elementDesctructRoute, elementDesctructRouteI) => {
                          if (elementDesctructRouteI >= 4) {
                            if (elementDesctructRouteI === 4) {
                              routeVTempF = elementDesctructRoute;
                            } else {
                              routeVTempF =
                                routeVTempF + "/" + elementDesctructRoute;
                            }
                          }
                        }
                      );

                      if (
                        routeVTempF +
                          folderElement.name +
                          "/" +
                          fileElement.contentFile.name ===
                        finalFile.route + "/" + finalFile.name
                      ) {
                        setIdParentFolderCVS(idParentFolder);
                        setContinueValidationSaveByFiles(true);
                      }
                    });
                  }
                }
              }
            );

            if (folderElement.folders.length !== 0) {
              uploadSubFolders(
                folderElement,
                dataUFTemp.folders[iFolderElement],
                result.payload.id,
                routeFolder + folderElement.name + "/",
                dataGeneral
              );
            }
          } else {
            dataUFTemp.folders[iFolderElement].products.forEach(
              (productElement, iProductElement) => {
                var folderProductObj = {
                  name: productElement.tempName + "-" + productElement.model,
                  description:
                    productElement.tempName + "-" + productElement.model,
                  isPO: false,
                  FolderId: result.payload.id,
                  UserId: dataGeneral.client.id,
                  StateDbPO: "new",
                };
                if (
                  productElement.id !== null &&
                  productElement.id !== undefined &&
                  productElement.id !== 0
                ) {
                } else {
                  dispatch(folderUp(folderProductObj)).then(
                    (resultFolderProductObj) => {
                      productElement.files.forEach(
                        (fileElement, iFileElement) => {
                          var datos = new FormData();
                          datos.append(`name`, fileElement.contentFile.name);
                          datos.append(
                            `description`,
                            fileElement.contentFile.name
                          );
                          datos.append(
                            `documentTypeId`,
                            fileElement.documentType.id
                          );
                          datos.append(`stateDbPO`, fileElement.statePO);
                          datos.append(
                            `Url`,
                            routeFolder +
                              folderElement.name +
                              "/" +
                              productElement.tempName +
                              "-" +
                              productElement.model
                          );
                          datos.append(
                            `FolderId`,
                            resultFolderProductObj.payload.id
                          );
                          datos.append(`file`, fileElement.contentFile);
                          if (fileElement.contentFile.name !== "") {
                            dispatch(fileUp(datos)).then(
                              (resultFileProductValue) => {
                                var desctructRouteFileProd =
                                  routeFolder.split("/");
                                var validationDesctructRouteFileProd = "";
                                desctructRouteFileProd.forEach(
                                  (
                                    elementDesctructRouteFileProd,
                                    IElementDesctructRouteFileProd
                                  ) => {
                                    if (IElementDesctructRouteFileProd === 4) {
                                      validationDesctructRouteFileProd =
                                        elementDesctructRouteFileProd;
                                    } else {
                                      validationDesctructRouteFileProd =
                                        validationDesctructRouteFileProd +
                                        "/" +
                                        elementDesctructRouteFileProd;
                                    }
                                  }
                                );

                                if (
                                  validationDesctructRouteFileProd +
                                    folderElement.name +
                                    "/" +
                                    productElement.tempName +
                                    "-" +
                                    productElement.model +
                                    "/" +
                                    fileElement.contentFile.name ===
                                  finalFileProducts.route +
                                    "/" +
                                    finalFileProducts.name
                                ) {
                                  setContinueValidationSaveByFilesProducts(
                                    true
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        });

        //subir folders vacios
        if (folderElement.files.length === 0) {
          dispatch(
            folderCreateSystemUp({
              FolderRoute: routeFolder + folderElement.name,
              StateDbPO: folderElement.statePO,
            })
          ).then((resultFCSUP) => {
            if (routeFolder + folderElement.name === finalFolder.route) {
              setContinueValidationSaveByFolders(true);
            }
          });
        }
      }
    });
  };

  const uploadMainFolders = (dataUMF, filesGeneralData) => {
    uploadSubFolders(
      dataUMF,
      filesGeneralData,
      dataUMF.id,
      dataUMF.client.name +
        "/" +
        dataUMF.year +
        "/" +
        dataUMF.productType +
        "/" +
        dataUMF.month +
        "/" +
        dataUMF.name +
        "/",
      dataUMF
    );
  };

  var lastFile = "";

  const handleSaveDataPO = () => {
    var oldNamePO = datosSS.name;

    datosSS.name = filesGeneral.name;
    datosSS.pediment = filesGeneral.pediment;
    handleUpdate();

    var validationSave = true;

    if (datosSS.name === "") {
      validationSave = false;
      messageDispatch(t("YOU_MUST_ENTER_A") + " " + t("NAME_PO"), "error");
    } else if (datosSS.year === "") {
      validationSave = false;
      messageDispatch(t("YOU_MUST_SELECT_A") + " " + t("YEAR"), "error");
    } else if (datosSS.month === "") {
      validationSave = false;
      messageDispatch(t("YOU_MUST_SELECT_A") + " " + t("MONTH"), "error");
    } else if (datosSS.productType === "") {
      validationSave = false;
      messageDispatch(
        t("YOU_MUST_SELECT_A") + " " + t("PRODUCT_TYPE"),
        "error"
      );
    } else if (!validationDocumentTypeFilesStorage(datosSS)) {
      validationSave = false;
      messageDispatch(
        t("YOU_MUST_SELECT_THE_DOCUMENT_TYPE_OF_ALL_NEW_FILES"),
        "error"
      );
    } else if (!validationFilesStorage(datosSS)) {
      validationSave = false;
    } else if (!validationFolderEvidencesUVA(datosSS)) {
      validationSave = false;
    }

    if (validationSave === true) {
      if (filesGeneral.name !== "") {
        if (filesGeneral.name !== oldNamePO) {
          dispatch(
            editFolderPO({ id: datosSS.id, name: filesGeneral.name })
          ).then((rey) => {
            findLastFile(datosSS, datosSS.name, datosSS.name);
            if (finalFile.name === "") {
              setContinueValidationSaveByFiles(true);
            }
            if (finalFileProducts.name === "") {
              setContinueValidationSaveByFilesProducts(true);
            }
            if (finalFolder.name === "") {
              setContinueValidationSaveByFolders(true);
            }
            setValidateButtonSave(true);
            uploadMainFolders(datosSS, filesGeneral);
          });
        } else {
          findLastFile(datosSS, datosSS.name, datosSS.name);
          if (finalFile.name === "") {
            setContinueValidationSaveByFiles(true);
          }
          if (finalFileProducts.name === "") {
            setContinueValidationSaveByFilesProducts(true);
          }
          if (finalFolder.name === "") {
            setContinueValidationSaveByFolders(true);
          }
          setValidateButtonSave(true);
          uploadMainFolders(datosSS, filesGeneral);
        }
      }
    }
  };

  const watchF = (file) => {
    var name = file.contentFile.name.split(".");
    var finalName = "";
    for (var i = 0; i < name.length - 1; i++) {
      finalName = finalName + name[i];
    }
    if (file.id === undefined) {
      if (file.contentFile.name !== "") {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = URL.createObjectURL(file.contentFile);
        if (
          file.documentType.icon === "image" ||
          file.documentType.icon === "pdf" ||
          file.documentType.icon === "xml"
        ) {
          a.target = "_blank";
        } else {
          a.download = finalName;
        }
        a.click();
      }
    } else {
      dispatch(
        downloadFile({
          id: file.id,
          name: file.contentFile.name,
          url: file.contentFile.name,
        })
      ).then((res) => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = res.payload.data.urlFile;
        if (
          file.documentType.icon === "image" ||
          file.documentType.icon === "pdf" ||
          file.documentType.icon === "xml"
        ) {
          a.target = "_blank";
        } else {
          a.download = finalName;
        }
        a.click();
      });
    }
  };

  const addFileUploadDelete = (idFile) => {
    setIdFilesDelete([
      ...idFilesDelete,
      {
        id: idFile,
      },
    ]);
  };

  const addFolderUploadDelete = (idFolder) => {
    setIdFoldersDelete([
      ...idFoldersDelete,
      {
        id: idFolder,
      },
    ]);
  };

  return (
    <div>
      <div
        className="flex -mx-4"
        style={{ paddingBottom: "15px", justifyContent: "end" }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="success"
          onClick={handleSaveDataPO}
          startIcon={<Icon>save</Icon>}
          disabled={validateButtonSave}
        >
          {t("UPDATE")}
        </Button>
      </div>

      <div className="flex -mx-4">
        <Controller
          name="namePO"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label={t("NAME_PO")}
              id="namePO"
              size="small"
              variant="outlined"
              fullWidth
              required
              error={!!errors.namePO}
              helperText={errors?.namePO?.message}
              value={filesGeneral ? filesGeneral.name : ""}
              //disabled={true}
              onChange={(event) => {
                field.onChange(event);
                handleNamePOState(event);
              }}
            />
          )}
        />

        <Controller
          name="pediment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label={t("PEDIMENT")}
              id="pediment"
              variant="outlined"
              size="small"
              fullWidth
              //error={!!errors.pediment}
              //helperText={errors?.pediment?.message}
              value={filesGeneral ? filesGeneral.pediment : ""}
              onChange={(event) => {
                field.onChange(event);
                handlePedimentPOState(event);
              }}
            />
          )}
        />
      </div>
      <div className="flex -mx-4">
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <FormControl className="w-full mt-8  mx-4" size="small">
              <InputLabel id="year-select-label" required>
                {t("YEAR")}
              </InputLabel>
              <Select
                {...field}
                labelId="year-select-label"
                id="year"
                label="Year"
                disabled={true}
                value={datosSS.year}
                onChange={(event) => {
                  field.onChange(event);
                  handleYearPOState(event);
                }}
              >
                {dataYears.length !== 0
                  ? dataYears.map((year, i) => (
                      <MenuItem key={i} value={year.name}>
                        <em> {year.name} </em>
                      </MenuItem>
                    ))
                  : false}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="month"
          control={control}
          render={({ field }) => (
            <FormControl className="w-full mt-8  mx-4" size="small">
              <InputLabel id="month-select-label" required>
                {t("MONTH")}
              </InputLabel>
              <Select
                {...field}
                labelId="month-select-label"
                id="month"
                label="Month"
                disabled={true}
                value={datosSS.month}
                onChange={(event) => {
                  field.onChange(event);
                  handleMonthPOState(event);
                }}
              >
                {months.length !== 0
                  ? months.map((month, i) => (
                      <MenuItem key={i} value={month.name}>
                        <em> {month.name} </em>
                      </MenuItem>
                    ))
                  : false}
              </Select>
            </FormControl>
          )}
        />
      </div>
      <div className="flex -mx-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl className="w-full mt-8  mx-4" size="small">
              <InputLabel id="type-select-label" required>
                {t("TYPE")}
              </InputLabel>
              <Select
                {...field}
                labelId="type-select-label"
                id="type"
                label="Type"
                disabled={true}
                value={datosSS.productType}
                onChange={(event) => {
                  field.onChange(event);
                  handleProductTypePOState(event);
                }}
              >
                {datosProductTypes.length !== 0
                  ? datosProductTypes[0].data.map((productTypeData, i) => (
                      <MenuItem
                        key={productTypeData.id}
                        value={productTypeData.name}
                      >
                        <em> {productTypeData.name} </em>
                      </MenuItem>
                    ))
                  : false}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label={t("CLIENT")}
              autoFocus
              id="client"
              size="small"
              variant="outlined"
              disabled={true}
              required
              fullWidth
              value={datosSS.client.name}
            />
          )}
        />
      </div>
      {filesGeneral ? (
        <AcordionComponent
          key={"key:" + datosSS.name}
          dataPO={datosSS}
          handleUpdate={handleUpdate}
          setFiles={setFiles}
          chooseFilesDataUpload={chooseFilesDataUpload}
          setChooseFilesDataUpload={setChooseFilesDataUpload}
          datosDocumentTypes={datosDocumentTypes}
          folderRouteEvidenciasUVA={datosSS.name + urlValidationUVAEvidencias}
          parentPOFolder={datosSS.name + "/"}
          filesGeneral={filesGeneral}
          chooseFilesProductFolder={chooseFilesProductFolder}
          control={control}
          defaultValues={defaultValues}
          schema={schema}
          formState={formState}
          isValid={isValid}
          dirtyFields={dirtyFields}
          errors={errors}
          messageDispatch={messageDispatch}
          validationFolderName={validationFolderName}
          validateButtonSave={validateButtonSave}
          watchF={watchF}
          addFileUploadDelete={addFileUploadDelete}
          addFolderUploadDelete={addFolderUploadDelete}
        />
      ) : (
        ""
      )}

      <div style={{ paddingTop: "25px" }}>
        {datosSS.files !== null ? (
          datosSS.files.map((file, i) =>
            file.statePO === "old" ? (
              <div key={i} className="flex flex-col md:flex-row -mx-8">
                <Controller
                  name={file.name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label={file.name}
                      value={file.contentFile.name}
                      id={file.name}
                      variant="outlined"
                      size="small"
                      disabled={true}
                      fullWidth
                    />
                  )}
                />
                <input
                  accept={file.documentType.extensionAllowed}
                  style={{ display: "none" }}
                  id={file.name + i + "fuGeneral"}
                  type="file"
                  onChange={(event) => {
                    chooseFile(event.target.files[0], i);
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <label
                  htmlFor={file.name + i + "fuGeneral"}
                  className="mt-8  mx-4"
                  style={{ minWidth: "15%" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Icon size="small">save</Icon>}
                    size="small"
                    style={{ height: "100%" }}
                    fullWidth
                    component="span"
                    disabled={validateButtonSave}
                  >
                    {t("CHOOSE_FILE")}
                  </Button>
                </label>

                <Tooltip
                  title={t("SEE") + " " + file.name}
                  placement="left"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt-8  mx-4"
                    size="small"
                    onClick={() => watchF(filesGeneral.files[i])}
                  >
                    <Icon>help</Icon>
                  </Button>
                </Tooltip>
              </div>
            ) : file.statePO === "new" ? (
              <div key={i} className="flex flex-col md:flex-row -mx-8">
                <FormControl className="w-full mt-8  mx-4" size="small">
                  <InputLabel id="category-select-label">
                    {t("MORE_FILES")}
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    label="Category"
                    name={i + ""}
                    value={file.documentType.name}
                    onChange={handleDocumentTypeState}
                    disabled={
                      validateButtonSave === true || file.id ? true : false
                    }
                  >
                    {datosDocumentTypes.length !== 0
                      ? datosDocumentTypes[0].data.map(
                          (documentTypeData, i) => (
                            <MenuItem
                              key={documentTypeData.id}
                              value={documentTypeData.name}
                            >
                              <em> {documentTypeData.name} </em>
                            </MenuItem>
                          )
                        )
                      : false}
                  </Select>
                </FormControl>
                <Controller
                  name={file.name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label={
                        file.name +
                        " (" +
                        file.documentType.name +
                        " - " +
                        file.documentType.extensionAllowed +
                        ")"
                      }
                      value={file.contentFile.name}
                      variant="outlined"
                      size="small"
                      style={{ minWidth: "50%" }}
                      disabled={true}
                      fullWidth
                    />
                  )}
                />

                <input
                  accept={file.documentType.extensionAllowed}
                  style={{ display: "none" }}
                  id={file.name + i + "fu"}
                  type="file"
                  disabled={
                    file.documentType.name === "" || validateButtonSave === true
                      ? true
                      : false
                  }
                  onChange={(event) => {
                    chooseFile(event.target.files[0], i);
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <label
                  htmlFor={file.name + i + "fu"}
                  className="mt-8  mx-4"
                  style={{ minWidth: "15%" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Icon size="small">save</Icon>}
                    size="small"
                    style={{ height: "100%" }}
                    fullWidth
                    component="span"
                    disabled={
                      file.documentType.name === "" ||
                      validateButtonSave === true
                        ? true
                        : false
                    }
                  >
                    {t("CHOOSE_FILE")}
                  </Button>
                </label>
                <Tooltip
                  title={t("SEE") + " " + file.name}
                  placement="left"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt-8  mx-4"
                    onClick={() => watchF(filesGeneral.files[i])}
                    size="small"
                  >
                    <Icon>help</Icon>
                  </Button>
                </Tooltip>
                <Button
                  variant="contained"
                  color="error"
                  className="mt-8  mx-4"
                  id={file.name + i + "deleteFile"}
                  key={file.name + i + "deleteFile"}
                  onClick={() => handleRemoveFile(i)}
                  size="small"
                  disabled={file.id ? true : false}
                >
                  <Icon>delete</Icon>
                </Button>
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col md:flex-row -mx-8 pt-20">
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id={datosSS.name + "selectNewResourceGeneral"}>
            {t("TYPE_SOURCE")}
          </InputLabel>
          <Select
            labelId={datosSS.name + "selectNewResourceGeneral"}
            id={datosSS.name + "categorySelectNewResourceGeneral"}
            label="Category"
            value={datosSS.addSourceState.state}
            name={datosSS.name + "General"}
            onChange={handleAddSourceState}
          >
            <MenuItem
              key={datosSS.name + "menuItemSelectNewResourceFolderGeneral"}
              value="folder"
            >
              <em> {t("FOLDER")} </em>
            </MenuItem>
            <MenuItem
              key={datosSS.name + "menuItemSelectNewResourceFileGeneral"}
              value="file"
            >
              <em> {t("FILE")} </em>
            </MenuItem>
          </Select>
        </FormControl>
        {datosSS.addSourceState.state === "folder" ? (
          <Controller
            name="New Folderf"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8  mx-4"
                label={t("NEW_FOLDER_NAME")}
                name={datosSS.name + "GeneralText"}
                value={
                  filesGeneral ? filesGeneral.addSourceState.nameFolder : ""
                }
                onChange={(event) => {
                  field.onChange(event);
                  onChangeTextNewFolder(event);
                }}
                variant="outlined"
                size="small"
                style={{ minWidth: "40%" }}
                fullWidth
              />
            )}
          />
        ) : (
          <></>
        )}
        <Button
          id={datosSS.name + "addNewFileFolder"}
          key={datosSS.name + "addNewFileFolder"}
          variant="contained"
          color="info"
          className="mt-8  mx-4"
          onClick={() => handleAdd()}
          startIcon={<Icon>add_circle</Icon>}
          size="small"
          disabled={validateButtonSave}
          style={
            datosSS.addSourceState.state === "folder"
              ? { minWidth: "40%" }
              : { minWidth: "80%" }
          }
          fullWidth
        >
          {t("ADD_SOURCE")}
        </Button>
      </div>
      <div className="pt-20">
        <hr style={{ borderTop: "3px solid #bbb" }} />
      </div>
      <div
        className="flex -mx-4"
        style={{ paddingTop: "15px", justifyContent: "end" }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="success"
          onClick={handleSaveDataPO}
          startIcon={<Icon>save</Icon>}
          disabled={validateButtonSave}
        >
          {t("UPDATE")}
        </Button>
      </div>
    </div>
  );
};

export default EditPOTab;
