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
  folderCreateSystemUp,
  getFoldersValidateUp,
} from "./../../store/poGeneralTemplateSlice";
import { selectProductTypes } from "./../../store/productTypesAdminSlice";
import { selectDocumentTypes } from "./../../store/documentTypesAdminSlice";
import { months, currentYear, dataPO } from "./../../store/Params";
import { Done } from "@mui/icons-material";

const NewPOTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var datosSS = JSON.parse(
    JSON.stringify(
      useSelector(
        ({ poGeneralTemplateApp }) =>
          poGeneralTemplateApp.poGeneralTemplate.datosPOs
      )
    )
  );

  const dataClient = JSON.parse(
    JSON.stringify(
      useSelector(({ globalParams }) => globalParams.generalParams.newPO.client)
    )
  );

  //const filesGeneral = JSON.parse(JSON.stringify(datosSS));

  const [chooseFilesDataUpload, setChooseFilesDataUpload] = useState([]);

  const datosProductTypes = useSelector(selectProductTypes);

  const datosDocumentTypes = useSelector(selectDocumentTypes);

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
    namePO: yup.string().required("You must enter a name"),
    pediment: yup.string().required("You must enter a pediment"),
    year: yup.string().required("You must select a year"),
    month: yup.string().required("You must select a month"),
    type: yup.string().required("You must select a type"),
  });

  const { control, formState } = useForm({
    mode: "onChange",
    validationSchema: defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  //--------------------------------

  useDeepCompareEffect(() => {
    if (dataClient.id === 0 && dataClient.name === "") {
      navigate("/projects");
    } else {
      datosSS.client.id = dataClient.id;
      datosSS.client.name = dataClient.name;
      handleUpdate();
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
    }
  }, [datosDocumentTypes]);

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

          handleUpdate();
        } else {
          messageDispatch("The folder name already exists", "error");
        }
      } else {
        messageDispatch("You must enter a folder name", "error");
      }
    } else if (datosSS.addSourceState.state === "file") {
      datosSS.files.push({
        name: "New File",
        statePO: "new",
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
    handleUpdate();
  };

  const handleNamePOState = (ev) => {
    datosSS.name = ev.target.value;
    filesGeneral.name = ev.target.value;
    //handleUpdate();
  };

  const handlePedimentPOState = (ev) => {
    datosSS.pediment = ev.target.value;
    /*if (datosSS.pediment === "") {
      errors.pediment = true;
    } else {
      errors.pediment = false;
    }*/
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
        autoHideDuration: 2500, //ms
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
      if (fileElement.contentFile.name === "") {
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

  const [
    validationFolderEvidencesUVAReturn,
    setValidationFolderEvidencesUVAReturn,
  ] = useState(true);

  const validationFolderEvidencesUVA = (dataVDTFS, mainFolder, route) => {
    dataVDTFS.folders.forEach((folderElement) => {
      validationFolderEvidencesUVA(
        folderElement,
        mainFolder,
        route + folderElement.name + "/"
      );

      if (route + folderElement.name === mainFolder + "/UVA/Evidencias") {
        folderElement.products.forEach((productElement, iProductElement) => {
          if (productElement.tempName === "") {
            setValidationFolderEvidencesUVAReturn(false);
            messageDispatch("You must enter a Product Name", "error");
          } else if (productElement.model === "") {
            setValidationFolderEvidencesUVAReturn(false);
            messageDispatch("You must enter a Product Model", "error");
          } else if (productElement.files.length === 0) {
            setValidationFolderEvidencesUVAReturn(false);
            messageDispatch("You must select the Product files", "error");
          }

          folderElement.products.forEach(
            (productValidationElement, iProductValidationElement) => {
              if (
                productValidationElement.tempName +
                  "-" +
                  productValidationElement.model ===
                  productElement.tempName + "-" + productElement.model &&
                iProductValidationElement !== iProductElement
              ) {
                setValidationFolderEvidencesUVAReturn(false);
                messageDispatch(
                  "The product in the Evidence folder already exists",
                  "error"
                );
              }
            }
          );
        });
      }
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
      dataClient.name +
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
        datosGeneralF.append(`Url`, routeFolder);
        datosGeneralF.append(`FolderId`, idParentFolder);
        datosGeneralF.append(`file`, fileElement.contentFile);
        dispatch(fileUp(datosGeneralF));
      });
    }

    dataUF.folders.forEach((folderElement, iFolderElement) => {
      var folderObj = {
        name: folderElement.name,
        description: folderElement.name,
        isPO: false,
        FolderId: idParentFolder,
        UserId: dataClient.userId,
      };

      dispatch(folderUp(folderObj)).then((result) => {
        if (
          routeFolder + folderElement.name !==
          dataClient.name +
            "/" +
            dataGeneral.year +
            "/" +
            dataGeneral.productType +
            "/" +
            dataGeneral.month +
            "/" +
            dataGeneral.name +
            "/UVA/Evidencias"
        ) {
          dataUFTemp.folders[iFolderElement].files.forEach(
            (fileElement, iFileElement) => {
              var datos = new FormData();
              datos.append(`name`, fileElement.contentFile.name);
              datos.append(`description`, fileElement.contentFile.name);
              datos.append(`documentTypeId`, fileElement.documentType.id);
              datos.append(`Url`, routeFolder + folderElement.name);
              datos.append(`FolderId`, result.payload.id);
              datos.append(`file`, fileElement.contentFile);
              dispatch(fileUp(datos));
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
                UserId: dataClient.userId,
              };
              dispatch(folderUp(folderProductObj)).then(
                (resultFolderProductObj) => {
                  productElement.files.forEach((fileElement, iFileElement) => {
                    var datos = new FormData();
                    datos.append(`name`, fileElement.contentFile.name);
                    datos.append(`description`, fileElement.contentFile.name);
                    datos.append(`documentTypeId`, fileElement.documentType.id);
                    datos.append(
                      `Url`,
                      routeFolder +
                        folderElement.name +
                        "/" +
                        productElement.tempName +
                        "-" +
                        productElement.model
                    );
                    datos.append(`FolderId`, resultFolderProductObj.payload.id);
                    datos.append(`file`, fileElement.contentFile);

                    dispatch(fileUp(datos));
                  });
                }
              );
            }
          );
        }
      });

      if (folderElement.files.length === 0) {
        dispatch(
          folderCreateSystemUp({
            FolderRoute: routeFolder + folderElement.name,
          })
        );
      }
    });
  };

  const uploadMainFolders = (dataUMF, filesGeneralData) => {
    var folderObjYear = {
      name: dataUMF.year,
      description: dataUMF.year,
      isPO: false,
      ProjectId: dataClient.id,
      UserId: dataClient.userId,
    };

    //validation Year
    dispatch(
      getFoldersValidateUp({
        Name: folderObjYear.name,
        ProjectId: folderObjYear.ProjectId,
      })
    ).then((resultValidateYear) => {
      if (resultValidateYear.payload.data.data.length === 0) {
        dispatch(folderUp(folderObjYear)).then((resultYear) => {
          var folderObjProductType = {
            name: dataUMF.productType,
            description: dataUMF.productType,
            isPO: false,
            FolderId: resultYear.payload.id,
            UserId: dataClient.userId,
          };

          //validation ProductType
          dispatch(
            getFoldersValidateUp({
              Name: folderObjProductType.name,
              FolderId: folderObjProductType.FolderId,
            })
          ).then((resultValidateProductType) => {
            if (resultValidateProductType.payload.data.data.length === 0) {
              dispatch(folderUp(folderObjProductType)).then(
                (resultProductType) => {
                  var folderObjMonth = {
                    name: dataUMF.month,
                    description: dataUMF.month,
                    isPO: false,
                    FolderId: resultProductType.payload.id,
                    UserId: dataClient.userId,
                  };
                  //validation month
                  dispatch(
                    getFoldersValidateUp({
                      Name: folderObjMonth.name,
                      FolderId: folderObjMonth.FolderId,
                    })
                  ).then((resultValidateMonth) => {
                    if (resultValidateMonth.payload.data.data.length === 0) {
                      dispatch(folderUp(folderObjMonth)).then((resultMonth) => {
                        var folderObjBNamePO = {
                          name: dataUMF.name,
                          description: dataUMF.name,
                          isPO: true,
                          FolderId: resultMonth.payload.id,
                          ProductTypeId: 0,
                          UserId: dataClient.userId,
                        };
                        datosProductTypes[0].data.forEach(
                          (productTypeElement) => {
                            if (
                              dataUMF.productType === productTypeElement.name
                            ) {
                              folderObjBNamePO.ProductTypeId =
                                productTypeElement.id;
                            }
                          }
                        );
                        //validacion
                        dispatch(
                          getFoldersValidateUp({
                            Name: folderObjBNamePO.name,
                            FolderId: folderObjBNamePO.FolderId,
                          })
                        ).then((resultValidateNamePO) => {
                          if (
                            resultValidateNamePO.payload.data.data.length === 0
                          ) {
                            dispatch(folderUp(folderObjBNamePO)).then(
                              (resultNamePO) => {
                                uploadSubFolders(
                                  dataUMF,
                                  filesGeneralData,
                                  resultNamePO.payload.id,
                                  dataClient.name +
                                    "/" +
                                    datosSS.year +
                                    "/" +
                                    datosSS.productType +
                                    "/" +
                                    datosSS.month +
                                    "/" +
                                    datosSS.name +
                                    "/",
                                  dataUMF
                                );
                                setTimeout(function () {
                                  messageDispatch("The PO was save!!", "success");
                                  navigate("/explorer/project/" + dataClient.id);
                                }, 5000);
                              }
                            );
                          } else {
                            setValidateButtonSave(false);
                            messageDispatch("The PO already exists", "error");
                          }
                        });
                      });
                    } else {
                      var folderObjBNamePO = {
                        name: dataUMF.name,
                        description: dataUMF.name,
                        isPO: true,
                        FolderId: resultValidateMonth.payload.data.data[0].id,
                        ProductTypeId: 0,
                        UserId: dataClient.userId,
                      };

                      datosProductTypes[0].data.forEach(
                        (productTypeElement) => {
                          if (dataUMF.productType === productTypeElement.name) {
                            folderObjBNamePO.ProductTypeId =
                              productTypeElement.id;
                          }
                        }
                      );
                      //validacion NamePO
                      dispatch(
                        getFoldersValidateUp({
                          Name: folderObjBNamePO.name,
                          FolderId: folderObjBNamePO.FolderId,
                        })
                      ).then((resultValidateNamePO) => {
                        if (
                          resultValidateNamePO.payload.data.data.length === 0
                        ) {
                          dispatch(folderUp(folderObjBNamePO)).then(
                            (resultNamePO) => {
                              uploadSubFolders(
                                dataUMF,
                                filesGeneralData,
                                resultNamePO.payload.id,
                                dataClient.name +
                                  "/" +
                                  datosSS.year +
                                  "/" +
                                  datosSS.productType +
                                  "/" +
                                  datosSS.month +
                                  "/" +
                                  datosSS.name +
                                  "/",
                                dataUMF
                              );
                              setTimeout(function () {
                                messageDispatch("The PO was save!!", "success");
                                navigate("/explorer/project/" + dataClient.id);
                              }, 5000);
                            }
                          );
                        } else {
                          setValidateButtonSave(false);
                          messageDispatch("The PO already exists", "error");
                        }
                      });
                    }
                  });
                }
              );
            } else {
              var folderObjMonth = {
                name: dataUMF.month,
                description: dataUMF.month,
                isPO: false,
                FolderId: resultValidateProductType.payload.data.data[0].id,
                UserId: dataClient.userId,
              };
              //validation month
              dispatch(
                getFoldersValidateUp({
                  Name: folderObjMonth.name,
                  FolderId: folderObjMonth.FolderId,
                })
              ).then((resultValidateMonth) => {
                if (resultValidateMonth.payload.data.data.length === 0) {
                  dispatch(folderUp(folderObjMonth)).then((resultMonth) => {
                    var folderObjBNamePO = {
                      name: dataUMF.name,
                      description: dataUMF.name,
                      isPO: true,
                      FolderId: resultMonth.payload.id,
                      ProductTypeId: 0,
                      UserId: dataClient.userId,
                    };
                    datosProductTypes[0].data.forEach((productTypeElement) => {
                      if (dataUMF.productType === productTypeElement.name) {
                        folderObjBNamePO.ProductTypeId = productTypeElement.id;
                      }
                    });
                    //validacion
                    dispatch(
                      getFoldersValidateUp({
                        Name: folderObjBNamePO.name,
                        FolderId: folderObjBNamePO.FolderId,
                      })
                    ).then((resultValidateNamePO) => {
                      if (resultValidateNamePO.payload.data.data.length === 0) {
                        dispatch(folderUp(folderObjBNamePO)).then(
                          (resultNamePO) => {
                            uploadSubFolders(
                              dataUMF,
                              filesGeneralData,
                              resultNamePO.payload.id,
                              dataClient.name +
                                "/" +
                                datosSS.year +
                                "/" +
                                datosSS.productType +
                                "/" +
                                datosSS.month +
                                "/" +
                                datosSS.name +
                                "/",
                              dataUMF
                            );
                            setTimeout(function () {
                              messageDispatch("The PO was save!!", "success");
                              navigate("/explorer/project/" + dataClient.id);
                            }, 5000);
                          }
                        );
                      } else {
                        setValidateButtonSave(false);
                        messageDispatch("The PO already exists", "error");
                      }
                    });
                  });
                } else {
                  var folderObjBNamePO = {
                    name: dataUMF.name,
                    description: dataUMF.name,
                    isPO: true,
                    FolderId: resultValidateMonth.payload.data.data[0].id,
                    ProductTypeId: 0,
                    UserId: dataClient.userId,
                  };
                  datosProductTypes[0].data.forEach((productTypeElement) => {
                    if (dataUMF.productType === productTypeElement.name) {
                      folderObjBNamePO.ProductTypeId = productTypeElement.id;
                    }
                  });
                  //validacion NamePO
                  dispatch(
                    getFoldersValidateUp({
                      Name: folderObjBNamePO.name,
                      FolderId: folderObjBNamePO.FolderId,
                    })
                  ).then((resultValidateNamePO) => {
                    if (resultValidateNamePO.payload.data.data.length === 0) {
                      dispatch(folderUp(folderObjBNamePO)).then(
                        (resultNamePO) => {
                          uploadSubFolders(
                            dataUMF,
                            filesGeneralData,
                            resultNamePO.payload.id,
                            dataClient.name +
                              "/" +
                              datosSS.year +
                              "/" +
                              datosSS.productType +
                              "/" +
                              datosSS.month +
                              "/" +
                              datosSS.name +
                              "/",
                            dataUMF
                          );
                          setTimeout(function () {
                            messageDispatch("The PO was save!!", "success");
                            navigate("/explorer/project/" + dataClient.id);
                          }, 5000);
                        }
                      );
                    } else {
                      setValidateButtonSave(false);
                      messageDispatch("The PO already exists", "error");
                    }
                  });
                }
              });
            }
          });
        });
      } else {
        var folderObjProductType = {
          name: dataUMF.productType,
          description: dataUMF.productType,
          isPO: false,
          FolderId: resultValidateYear.payload.data.data[0].id,
          UserId: dataClient.userId,
        };

        //validation ProductType
        dispatch(
          getFoldersValidateUp({
            Name: folderObjProductType.name,
            FolderId: folderObjProductType.FolderId,
          })
        ).then((resultValidateProductType) => {
          if (resultValidateProductType.payload.data.data.length === 0) {
            dispatch(folderUp(folderObjProductType)).then(
              (resultProductType) => {
                var folderObjMonth = {
                  name: dataUMF.month,
                  description: dataUMF.month,
                  isPO: false,
                  FolderId: resultProductType.payload.id,
                  UserId: dataClient.userId,
                };
                //validation month
                dispatch(
                  getFoldersValidateUp({
                    Name: folderObjMonth.name,
                    FolderId: folderObjMonth.FolderId,
                  })
                ).then((resultValidateMonth) => {
                  if (resultValidateMonth.payload.data.data.length === 0) {
                    dispatch(folderUp(folderObjMonth)).then((resultMonth) => {
                      var folderObjBNamePO = {
                        name: dataUMF.name,
                        description: dataUMF.name,
                        isPO: true,
                        FolderId: resultMonth.payload.id,
                        ProductTypeId: 0,
                        UserId: dataClient.userId,
                      };
                      datosProductTypes[0].data.forEach(
                        (productTypeElement) => {
                          if (dataUMF.productType === productTypeElement.name) {
                            folderObjBNamePO.ProductTypeId =
                              productTypeElement.id;
                          }
                        }
                      );
                      //validacion
                      dispatch(
                        getFoldersValidateUp({
                          Name: folderObjBNamePO.name,
                          FolderId: folderObjBNamePO.FolderId,
                        })
                      ).then((resultValidateNamePO) => {
                        if (
                          resultValidateNamePO.payload.data.data.length === 0
                        ) {
                          dispatch(folderUp(folderObjBNamePO)).then(
                            (resultNamePO) => {
                              uploadSubFolders(
                                dataUMF,
                                filesGeneralData,
                                resultNamePO.payload.id,
                                dataClient.name +
                                  "/" +
                                  datosSS.year +
                                  "/" +
                                  datosSS.productType +
                                  "/" +
                                  datosSS.month +
                                  "/" +
                                  datosSS.name +
                                  "/",
                                dataUMF
                              );
                              setTimeout(function () {
                                messageDispatch("The PO was save!!", "success");
                                navigate("/explorer/project/" + dataClient.id);
                              }, 5000);
                            }
                          );
                        } else {
                          setValidateButtonSave(false);
                          messageDispatch("The PO already exists", "error");
                        }
                      });
                    });
                  } else {
                    var folderObjBNamePO = {
                      name: dataUMF.name,
                      description: dataUMF.name,
                      isPO: true,
                      FolderId: resultValidateMonth.payload.data.data[0].id,
                      ProductTypeId: 0,
                      UserId: dataClient.userId,
                    };
                    datosProductTypes[0].data.forEach((productTypeElement) => {
                      if (dataUMF.productType === productTypeElement.name) {
                        folderObjBNamePO.ProductTypeId = productTypeElement.id;
                      }
                    });
                    //validacion NamePO
                    dispatch(
                      getFoldersValidateUp({
                        Name: folderObjBNamePO.name,
                        FolderId: folderObjBNamePO.FolderId,
                      })
                    ).then((resultValidateNamePO) => {
                      if (resultValidateNamePO.payload.data.data.length === 0) {
                        dispatch(folderUp(folderObjBNamePO)).then(
                          (resultNamePO) => {
                            uploadSubFolders(
                              dataUMF,
                              filesGeneralData,
                              resultNamePO.payload.id,
                              dataClient.name +
                                "/" +
                                datosSS.year +
                                "/" +
                                datosSS.productType +
                                "/" +
                                datosSS.month +
                                "/" +
                                datosSS.name +
                                "/",
                              dataUMF
                            );
                            setTimeout(function () {
                              messageDispatch("The PO was save!!", "success");
                              navigate("/explorer/project/" + dataClient.id);
                            }, 5000);
                          }
                        );
                      } else {
                        setValidateButtonSave(false);
                        messageDispatch("The PO already exists", "error");
                      }
                    });
                  }
                });
              }
            );
          } else {
            var folderObjMonth = {
              name: dataUMF.month,
              description: dataUMF.month,
              isPO: false,
              FolderId: resultValidateProductType.payload.data.data[0].id,
              UserId: dataClient.userId,
            };
            //validation month
            dispatch(
              getFoldersValidateUp({
                Name: folderObjMonth.name,
                FolderId: folderObjMonth.FolderId,
              })
            ).then((resultValidateMonth) => {
              if (resultValidateMonth.payload.data.data.length === 0) {
                dispatch(folderUp(folderObjMonth)).then((resultMonth) => {
                  var folderObjBNamePO = {
                    name: dataUMF.name,
                    description: dataUMF.name,
                    isPO: true,
                    FolderId: resultMonth.payload.id,
                    ProductTypeId: 0,
                    UserId: dataClient.userId,
                  };
                  datosProductTypes[0].data.forEach((productTypeElement) => {
                    if (dataUMF.productType === productTypeElement.name) {
                      folderObjBNamePO.ProductTypeId = productTypeElement.id;
                    }
                  });
                  //validacion
                  dispatch(
                    getFoldersValidateUp({
                      Name: folderObjBNamePO.name,
                      FolderId: folderObjBNamePO.FolderId,
                    })
                  ).then((resultValidateNamePO) => {
                    if (resultValidateNamePO.payload.data.data.length === 0) {
                      dispatch(folderUp(folderObjBNamePO)).then(
                        (resultNamePO) => {
                          uploadSubFolders(
                            dataUMF,
                            filesGeneralData,
                            resultNamePO.payload.id,
                            dataClient.name +
                              "/" +
                              datosSS.year +
                              "/" +
                              datosSS.productType +
                              "/" +
                              datosSS.month +
                              "/" +
                              datosSS.name +
                              "/",
                            dataUMF
                          );
                          setTimeout(function () {
                            messageDispatch("The PO was save!!", "success");
                            navigate("/explorer/project/" + dataClient.id);
                          }, 5000);
                        }
                      );
                    } else {
                      setValidateButtonSave(false);
                      messageDispatch("The PO already exists", "error");
                    }
                  });
                });
              } else {
                var folderObjBNamePO = {
                  name: dataUMF.name,
                  description: dataUMF.name,
                  isPO: true,
                  FolderId: resultValidateMonth.payload.data.data[0].id,
                  ProductTypeId: 0,
                  UserId: dataClient.userId,
                };
                datosProductTypes[0].data.forEach((productTypeElement) => {
                  if (dataUMF.productType === productTypeElement.name) {
                    folderObjBNamePO.ProductTypeId = productTypeElement.id;
                  }
                });
                //validacion NamePO
                dispatch(
                  getFoldersValidateUp({
                    Name: folderObjBNamePO.name,
                    FolderId: folderObjBNamePO.FolderId,
                  })
                ).then((resultValidateNamePO) => {
                  if (resultValidateNamePO.payload.data.data.length === 0) {
                    dispatch(folderUp(folderObjBNamePO)).then(
                      (resultNamePO) => {
                        uploadSubFolders(
                          dataUMF,
                          filesGeneralData,
                          resultNamePO.payload.id,
                          dataClient.name +
                            "/" +
                            datosSS.year +
                            "/" +
                            datosSS.productType +
                            "/" +
                            datosSS.month +
                            "/" +
                            datosSS.name +
                            "/",
                          dataUMF
                        );
                        setTimeout(function () {
                          messageDispatch("The PO was save!!", "success");
                          navigate("/explorer/project/" + dataClient.id);
                        }, 5000);
                      }
                    );
                  } else {
                    setValidateButtonSave(false);
                    messageDispatch("The PO already exists", "error");
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  const handleSaveDataPO = () => {
    datosSS.name = filesGeneral.name;
    handleUpdate();

    var validationSave = true;

    validationFolderEvidencesUVA(datosSS, datosSS.name, datosSS.name + "/");

    if (datosSS.name === "") {
      validationSave = false;
      messageDispatch("You must enter a Name PO", "error");
    } else if (datosSS.year === "") {
      validationSave = false;
      messageDispatch("You must select a year", "error");
    } else if (datosSS.month === "") {
      validationSave = false;
      messageDispatch("You must select a month", "error");
    } else if (datosSS.productType === "") {
      validationSave = false;
      messageDispatch("You must select a Product Type", "error");
    } else if (!validationDocumentTypeFilesStorage(datosSS)) {
      validationSave = false;
      messageDispatch(
        "You must select the document type of all files",
        "error"
      );
    } else if (!validationFilesStorage(datosSS)) {
      validationSave = false;
      messageDispatch("You must select all files", "error");
    } else if (!validationFolderEvidencesUVAReturn) {
      validationSave = false;
    }

    if (validationSave === true) {
      setValidateButtonSave(true);
      uploadMainFolders(datosSS, filesGeneral);
    }
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
          Save
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
              label="Name PO"
              id="namePO"
              size="small"
              variant="outlined"
              fullWidth
              required
              error={!!errors.namePO}
              helperText={errors?.namePO?.message}
              value={filesGeneral ? filesGeneral.name : ""}
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
              label="Pediment"
              id="pediment"
              variant="outlined"
              size="small"
              fullWidth
              //error={!!errors.pediment}
              //helperText={errors?.pediment?.message}
              value={datosSS.pediment}
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
                Year
              </InputLabel>
              <Select
                {...field}
                labelId="year-select-label"
                id="year"
                label="Year"
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
                Month
              </InputLabel>
              <Select
                {...field}
                labelId="month-select-label"
                id="month"
                label="Month"
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
                Type
              </InputLabel>
              <Select
                {...field}
                labelId="type-select-label"
                id="type"
                label="Type"
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
              label="Client"
              autoFocus
              id="client"
              size="small"
              variant="outlined"
              disabled={true}
              required
              fullWidth
              value={dataClient.name}
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
          folderRouteEvidenciasUVA={datosSS.name + "/UVA/Evidencias"}
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
                  >
                    Choose File
                  </Button>
                </label>

                <Tooltip
                  title={file.name}
                  placement="left"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt-8  mx-4"
                    size="small"
                  >
                    <Icon>help</Icon>
                  </Button>
                </Tooltip>
              </div>
            ) : file.statePO === "new" ? (
              <div key={i} className="flex flex-col md:flex-row -mx-8">
                <FormControl className="w-full mt-8  mx-4" size="small">
                  <InputLabel id="category-select-label">More Files</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    label="Category"
                    name={i + ""}
                    value={file.documentType.name}
                    onChange={handleDocumentTypeState}
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
                  disabled={file.documentType.name === "" ? true : false}
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
                    disabled={file.documentType.name === "" ? true : false}
                  >
                    Choose File
                  </Button>
                </label>
                <Tooltip
                  title={file.name}
                  placement="left"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt-8  mx-4"
                    //onClick={handleRemoveProduct}
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
            Type Source
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
              <em> Folder </em>
            </MenuItem>
            <MenuItem
              key={datosSS.name + "menuItemSelectNewResourceFileGeneral"}
              value="file"
            >
              <em> File </em>
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
                label="New Folder"
                name={datosSS.name + "GeneralText"}
                value={datosSS.addSourceState.nameFolder}
                onChange={onChangeTextNewFolder}
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
          style={
            datosSS.addSourceState.state === "folder"
              ? { minWidth: "40%" }
              : { minWidth: "80%" }
          }
          fullWidth
        >
          Add Source
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
          Save
        </Button>
      </div>
    </div>
  );
};

export default NewPOTab;
