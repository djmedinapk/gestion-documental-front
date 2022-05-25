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

import { useDeepCompareEffect } from "@fuse/hooks";

const AcordionComponent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [props]);

  const handleAccordionState = (indexFolder, folder) => {
    if (props.dataPO.folders[indexFolder].accordionState !== folder.name) {
      props.dataPO.folders[indexFolder].accordionState = folder.name;
    } else {
      props.dataPO.folders[indexFolder].accordionState = false;
    }
    props.handleUpdate();
  };

  const chooseFile = (event, indexFolder, indexFile) => {
    props.filesGeneral.folders[indexFolder].files[indexFile].contentFile =
      event;
    props.dataPO.folders[indexFolder].files[indexFile].contentFile.name =
      event.name;
    props.dataPO.folders[indexFolder].files[
      indexFile
    ].contentFile.lastModified = event.lastModified;
    props.dataPO.folders[indexFolder].files[
      indexFile
    ].contentFile.lastModifiedDate = event.lastModifiedDate;
    props.dataPO.folders[indexFolder].files[indexFile].contentFile.size =
      event.size;
    props.dataPO.folders[indexFolder].files[indexFile].contentFile.type =
      event.type;
    props.handleUpdate();
  };

  const chooseFileProductFolder = (
    event,
    indexFolder,
    indexProduct,
    indexFile
  ) => {
    props.setChooseFilesDataUpload({
      ...props.chooseFilesDataUpload,
      [Object.keys(props.chooseFilesDataUpload).length + ""]: event,
    });
    props.dataPO.folders[indexFolder].products[indexProduct].files[
      indexFile
    ].name = event.name;
    props.dataPO.folders[indexFolder].products[indexProduct].files[
      indexFile
    ].contentFile.name = event.name;
    props.dataPO.folders[indexFolder].products[indexProduct].files[
      indexFile
    ].contentFile.lastModified = event.lastModified;
    props.dataPO.folders[indexFolder].products[indexProduct].files[
      indexFile
    ].contentFile.lastModifiedDate = event.lastModifiedDate;
    props.dataPO.folders[indexFolder].products[indexProduct].files[
      indexFile
    ].contentFile.size = event.size;
    props.dataPO.folders[indexFolder].products[indexProduct].files[
      indexFile
    ].contentFile.type = event.type;
    props.handleUpdate();
  };

  const handleAdd = (indexFolder) => {
    if (props.dataPO.folders[indexFolder].addSourceState.state === "folder") {
      if (props.dataPO.folders[indexFolder].addSourceState.nameFolder !== "") {
        if (
          !props.validationFolderName(
            props.dataPO.folders[indexFolder].folders,
            props.dataPO.folders[indexFolder].addSourceState.nameFolder
          )
        ) {
          props.dataPO.folders[indexFolder].folders.push({
            name: props.dataPO.folders[indexFolder].addSourceState.nameFolder,
            statePO: "new",
            accordionState:
              props.dataPO.folders[indexFolder].addSourceState.nameFolder,
            addSourceState: { state: "", nameFolder: "" },
            files: [],
            folders: [],
          });

          props.filesGeneral.folders[indexFolder].folders.push({
            name: props.dataPO.folders[indexFolder].addSourceState.nameFolder,
            statePO: "new",
            accordionState:
              props.dataPO.folders[indexFolder].addSourceState.nameFolder,
            addSourceState: { state: "", nameFolder: "" },
            files: [],
            folders: [],
          });
          props.dataPO.folders[indexFolder].addSourceState.state = "";
          props.dataPO.folders[indexFolder].addSourceState.nameFolder = "";

          props.handleUpdate();
        } else {
          props.messageDispatch("The folder name already exists", "error");
        }
      } else {
        props.messageDispatch("You must enter a folder name", "error");
      }
    } else if (
      props.dataPO.folders[indexFolder].addSourceState.state === "file"
    ) {
      props.dataPO.folders[indexFolder].files.push({
        name: "New File",
        statePO: "new",
        documentType: {
          id: 0,
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
      props.filesGeneral.folders[indexFolder].files.push({
        name: "New File",
        statePO: "new",
        documentType: {
          id: 0,
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
      props.dataPO.folders[indexFolder].addSourceState.state = "";

      props.handleUpdate();
    } else if (
      props.dataPO.folders[indexFolder].addSourceState.state === "product"
    ) {
      props.dataPO.folders[indexFolder].products.push({
        name: "",
        tempName: "",
        model: "",
        statePO: "new",
        files: [],
      });
      props.filesGeneral.folders[indexFolder].products.push({
        name: "",
        tempName: "",
        model: "",
        statePO: "new",
        files: [],
      });
      props.dataPO.folders[indexFolder].addSourceState.state = "";

      props.handleUpdate();
    }
  };

  const handleAddFileProductFolder = (indexFolder, indexProduct) => {
    props.dataPO.folders[indexFolder].products[indexProduct].files.push({
      name: "New File",
      statePO: "new",
      documentType: {
        id: 0,
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

    props.handleUpdate();
  };

  const handleRemoveFolder = (index) => {
    props.dataPO.folders.splice(index, 1);
    props.filesGeneral.folders.splice(index, 1);
    props.handleUpdate();
  };

  const handleRemoveFile = (indexFolder, indexFile) => {
    props.dataPO.folders[indexFolder].files.splice(indexFile, 1);
    props.filesGeneral.folders[indexFolder].files.splice(indexFile, 1);
    props.handleUpdate();
  };

  const handleRemoveProduct = (indexFolder, indexProduct) => {
    props.dataPO.folders[indexFolder].products.splice(indexProduct, 1);
    props.filesGeneral.folders[indexFolder].products.splice(indexProduct, 1);
    props.handleUpdate();
  };
  const handleRemoveFileProduct = (indexFolder, indexProduct, indexFile) => {
    props.dataPO.folders[indexFolder].products[indexProduct].files.splice(
      indexFile,
      1
    );
    props.handleUpdate();
  };

  function handleAddSourceState(ev) {
    props.dataPO.folders[ev.target.name].addSourceState.state = ev.target.value;
    props.handleUpdate();
  }

  const onChangeTextNewFolder = (ev) => {
    props.dataPO.folders[ev.target.name].addSourceState.nameFolder =
      ev.target.value;
    props.handleUpdate();
  };

  const handleDocumentTypeState = (ev) => {
    var arrayIndex = ev.target.name.split(".");
    var documentsTypes = props.datosDocumentTypes[0].data;

    documentsTypes.forEach((documentTypeElement) => {
      if (documentTypeElement.name === ev.target.value) {
        props.dataPO.folders[arrayIndex[0]].files[arrayIndex[1]].documentType =
          documentTypeElement;
        props.filesGeneral.folders[arrayIndex[0]].files[
          arrayIndex[1]
        ].documentType = documentTypeElement;
      }
    });

    props.handleUpdate();
  };

  const onChangeTextNameProductEvidenciasUVA = (iFolderPO, iProductPO) => {
    props.dataPO.folders[iFolderPO].products[iProductPO].tempName =
      event.target.value;
    props.filesGeneral.folders[iFolderPO].products[iProductPO].tempName =
      event.target.value;
    props.handleUpdate();
  };

  const onChangeTextModelProductEvidenciasUVA = (ev) => {
    var arrayIndex = ev.target.name.split(".");
    props.dataPO.folders[arrayIndex[0]].products[arrayIndex[1]].model =
      ev.target.value;
    props.filesGeneral.folders[arrayIndex[0]].products[arrayIndex[1]].model =
      ev.target.value;
    props.handleUpdate();
  };
  const handleValidationYup = (index) => {
    //props.setValidationYup(index);
  };

  const chooseFilesProductFolderInput = (event, indexFolder, indexProduct) => {
    var documentsTypes = props.datosDocumentTypes[0].data;
    var documentSigleTypeImage = {
      id: 0,
      name: "",
      description: "",
      regex: "",
      code: "",
      icon: "",
      extensionAllowed: "",
      lastUpdated: "",
    };

    documentsTypes.forEach((documentTypeElement) => {
      if (documentTypeElement.name === "Image Evidences") {
        documentSigleTypeImage = documentTypeElement;
      }
    });

    props.dataPO.folders[indexFolder].products[indexProduct].files = [];
    for (let index = 0; index < event.length; index++) {
      props.dataPO.folders[indexFolder].products[indexProduct].files.push({
        name: "New File",
        statePO: "new",
        documentType: documentSigleTypeImage,
        contentFile: {
          name: "",
          lastModified: 0,
          lastModifiedDate: null,
          size: 0,
          type: "",
        },
      });

      props.dataPO.folders[indexFolder].products[indexProduct].files[
        index
      ].contentFile.name = event[index].name;
      props.dataPO.folders[indexFolder].products[indexProduct].files[
        index
      ].contentFile.lastModified = event[index].lastModified;
      props.dataPO.folders[indexFolder].products[indexProduct].files[
        index
      ].contentFile.lastModifiedDate = event[index].lastModifiedDate;
      props.dataPO.folders[indexFolder].products[indexProduct].files[
        index
      ].contentFile.size = event[index].size;
      props.dataPO.folders[indexFolder].products[indexProduct].files[
        index
      ].contentFile.type = event[index].type;
    }

    props.handleUpdate();

    props.filesGeneral.folders[indexFolder].products[indexProduct].files = [];

    for (let index = 0; index < event.length; index++) {
      props.filesGeneral.folders[indexFolder].products[indexProduct].files.push(
        {
          name: "New File",
          statePO: "new",
          documentType: documentSigleTypeImage,
          contentFile: null,
        }
      );
      const pepe = new FormData();
      pepe.append("archivo", event[index]);
      props.filesGeneral.folders[indexFolder].products[indexProduct].files[
        index
      ].contentFile = event[index];
    }
  };

  return (
    <>
      {props.dataPO.folders.map((folderPO, iFolderPO) => (
        <div key={props.parentPOFolder + "/" + folderPO.name + "/...DivMain"}>
          <div
            key={
              props.parentPOFolder +
              "/" +
              folderPO.name +
              "/...DivButtonDeleteFolder"
            }
            style={{
              justifyContent: "end",
              display: "flex",
              paddingTop: "2%",
            }}
          >
            {folderPO.statePO === "new" ? (
              <Button
                key={
                  props.parentPOFolder +
                  "/" +
                  folderPO.name +
                  "/...ButtonDeleteFolder"
                }
                variant="contained"
                color="error"
                onClick={() => handleRemoveFolder(iFolderPO)}
                size="small"
                style={{ maxWidth: "10%" }}
              >
                <Icon>delete</Icon>
              </Button>
            ) : (
              false
            )}
          </div>

          <Accordion
            key={
              props.parentPOFolder + "/" + folderPO.name + "/...AcordionFolder"
            }
            className="border-0 shadow-0 overflow-hidden"
            expanded={folderPO.name === folderPO.accordionState}
            onChange={() => handleAccordionState(iFolderPO, folderPO)}
          >
            <AccordionSummary
              key={
                props.parentPOFolder +
                "/" +
                folderPO.name +
                "/...AcordionSummaryFolder"
              }
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: "border border-solid mt-8" }}
            >
              <div
                key={
                  props.parentPOFolder +
                  "/" +
                  folderPO.name +
                  "/...DivAcordionSummaryFolder"
                }
                style={{
                  justifyContent: "space-between",
                  display: "inline-flex",
                  minWidth: "95%",
                }}
              >
                <Typography
                  key={
                    props.parentPOFolder +
                    "/" +
                    folderPO.name +
                    "/...TypographyDivAcordionSummaryFolder"
                  }
                  className="font-semibold"
                  style={{ alignSelf: "center" }}
                >
                  {folderPO.name}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails
              key={
                props.parentPOFolder +
                "/" +
                folderPO.name +
                "/...AcordionDetailsFolder"
              }
              style={{ border: "1px solid", borderTopStyle: "hidden" }}
            >
              {props.parentPOFolder + folderPO.name ===
              props.folderRouteEvidenciasUVA
                ? folderPO.products.map((productPO, iProductPO) => (
                    <div
                      key={
                        props.parentPOFolder +
                        "/" +
                        folderPO.name +
                        "/" +
                        productPO.name +
                        "-" +
                        iProductPO +
                        "/...AcordionDetailsFolderProductDivGeneral"
                      }
                    >
                      {productPO.statePO === "new" ? (
                        <div
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivButtonDelete"
                          }
                          style={{
                            justifyContent: "end",
                            display: "flex",
                            paddingTop: "2%",
                          }}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              productPO.name +
                              "-" +
                              iProductPO +
                              "/...AcordionDetailsFolderProductDivInsideButtonDelete"
                            }
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleRemoveProduct(iFolderPO, iProductPO)
                            }
                            size="small"
                            style={{ maxWidth: "10%" }}
                          >
                            <Icon>delete</Icon>
                          </Button>
                        </div>
                      ) : (
                        false
                      )}

                      <div
                        className="flex -mx-4"
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/" +
                          productPO.name +
                          "-" +
                          iProductPO +
                          "/...AcordionDetailsFolderProductDivControllers"
                        }
                      >
                        <Controller
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivControllersName"
                          }
                          name={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivControllersName"
                          }
                          control={props.control}
                          render={({ field }) => (
                            <TextField
                              key={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                productPO.name +
                                "-" +
                                iProductPO +
                                "/...AcordionDetailsFolderProductDivControllersNameTextField"
                              }
                              {...field}
                              className="mt-8  mx-4"
                              label="Product Name"
                              id={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                productPO.name +
                                "-" +
                                iProductPO +
                                "/...AcordionDetailsFolderProductDivControllersName"
                              }
                              value={productPO.tempName}
                              name={iFolderPO + "." + iProductPO}
                              onChange={(event) =>
                                onChangeTextNameProductEvidenciasUVA(
                                  iFolderPO,
                                  iProductPO
                                )
                              }
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          )}
                        />

                        <Controller
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivControllersModel"
                          }
                          name={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivControllersModel"
                          }
                          control={props.control}
                          render={({ field }) => (
                            <TextField
                              key={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                productPO.name +
                                "-" +
                                iProductPO +
                                "/...AcordionDetailsFolderProductDivControllersModelTextField"
                              }
                              {...field}
                              className="mt-8  mx-4"
                              label="Model"
                              id={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                productPO.name +
                                "-" +
                                iProductPO +
                                "/...AcordionDetailsFolderProductDivControllersModel"
                              }
                              value={productPO.model}
                              name={iFolderPO + "." + iProductPO}
                              onChange={onChangeTextModelProductEvidenciasUVA}
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          )}
                        />
                      </div>

                      <div
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/" +
                          productPO.name +
                          "-" +
                          iProductPO +
                          "/...AcordionDetailsFolderProductDivControllerChooseFilesGeneral"
                        }
                        className="flex flex-col md:flex-row -mx-8"
                      >
                        <Controller
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivControllerInsideChooseFiles"
                          }
                          name={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivControllerInsideChooseFiles"
                          }
                          control={props.control}
                          render={({ field }) => (
                            <TextField
                              key={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                productPO.name +
                                "-" +
                                iProductPO +
                                "/...AcordionDetailsFolderProductDivControllerInsideChooseFilesTextField"
                              }
                              {...field}
                              className="mt-8  mx-4"
                              label="Evidences (image/*)"
                              value={productPO.files.map(
                                (fileProductMap) =>
                                  " " + fileProductMap.contentFile.name
                              )}
                              id={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                productPO.name +
                                "-" +
                                iProductPO +
                                "/...AcordionDetailsFolderProductDivControllerInsideChooseFilesTextField"
                              }
                              variant="outlined"
                              size="small"
                              disabled={true}
                              fullWidth
                            />
                          )}
                        />
                        <input
                          id={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivInputInsideChooseFiles"
                          }
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivInputInsideChooseFiles"
                          }
                          accept="image/*"
                          style={{ display: "none" }}
                          type="file"
                          multiple
                          onChange={(event) => {
                            chooseFilesProductFolderInput(
                              event.target.files,
                              iFolderPO,
                              iProductPO,
                              productPO
                            );
                          }}
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                        <label
                          htmlFor={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivInputInsideChooseFiles"
                          }
                          className="mt-8  mx-4"
                          style={{ minWidth: "15%" }}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              productPO.name +
                              "-" +
                              iProductPO +
                              "/...AcordionDetailsFolderProductDivButtonInsideChooseFiles"
                            }
                            variant="contained"
                            color="secondary"
                            startIcon={<Icon size="small">save</Icon>}
                            size="small"
                            style={{ height: "100%" }}
                            fullWidth
                            component="span"
                          >
                            Choose Files
                          </Button>
                        </label>

                        <Tooltip
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            productPO.name +
                            "-" +
                            iProductPO +
                            "/...AcordionDetailsFolderProductDivTooltipInsideChooseFiles"
                          }
                          title="Choose All Files"
                          placement="left"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              productPO.name +
                              "-" +
                              iProductPO +
                              "/...AcordionDetailsFolderProductDivTooltipButtonInsideChooseFiles"
                            }
                            variant="contained"
                            color="primary"
                            className="mt-8  mx-4"
                            size="small"
                          >
                            <Icon>help</Icon>
                          </Button>
                        </Tooltip>
                      </div>

                      <div
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/" +
                          productPO.name +
                          "-" +
                          iProductPO +
                          "/...AcordionDetailsFolderProductDivHrInsideChooseFiles"
                        }
                        className="pt-20"
                      >
                        <hr
                          style={{
                            borderTop: "2px solid #bbb",
                            paddingBottom: "10px",
                          }}
                        />
                      </div>
                    </div>
                  ))
                : false}

              {folderPO.files !== null
                ? folderPO.files.map((filePO, iFilePO) =>
                    filePO.statePO === "old" ? (
                      <div
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/" +
                          filePO.name +
                          "-" +
                          iFilePO +
                          "/...AcordionDetailsFolderFileDiv"
                        }
                        className="flex flex-col md:flex-row -mx-8"
                      >
                        {handleValidationYup(
                          props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivController"
                        )}
                        <Controller
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivController"
                          }
                          name={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivController"
                          }
                          control={props.control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mt-8  mx-4"
                              label={
                                filePO.name +
                                " (" +
                                filePO.documentType.extensionAllowed +
                                ")"
                              }
                              value={filePO.contentFile.name}
                              required
                              id={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                filePO.name +
                                "-" +
                                iFilePO +
                                "/...AcordionDetailsFolderFileDivController"
                              }
                              key={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                filePO.name +
                                "-" +
                                iFilePO +
                                "/...AcordionDetailsFolderFileDivControllerTextField"
                              }
                              variant="outlined"
                              size="small"
                              disabled={true}
                              fullWidth
                            />
                          )}
                        />
                        <input
                          accept={filePO.documentType.extensionAllowed}
                          style={{ display: "none" }}
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivInput"
                          }
                          id={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivInput"
                          }
                          type="file"
                          onChange={(event) => {
                            chooseFile(
                              event.target.files[0],
                              iFolderPO,
                              iFilePO
                            );
                          }}
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                        <label
                          htmlFor={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivInput"
                          }
                          className="mt-8  mx-4"
                          style={{ minWidth: "15%" }}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivInputButtonSave"
                            }
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
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivTooltip"
                          }
                          title={filePO.name}
                          placement="left"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivTooltipButtonHelp"
                            }
                            variant="contained"
                            color="primary"
                            className="mt-8  mx-4"
                            size="small"
                          >
                            <Icon>help</Icon>
                          </Button>
                        </Tooltip>
                      </div>
                    ) : filePO.statePO === "new" ? (
                      <div
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/" +
                          filePO.name +
                          "-" +
                          iFilePO +
                          "/...AcordionDetailsFolderFileDivNew"
                        }
                        className="flex flex-col md:flex-row -mx-8"
                      >
                        <FormControl
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewFormControl"
                          }
                          className="w-full mt-8  mx-4"
                          size="small"
                        >
                          <InputLabel
                            id={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivNewFormControlInputLabel"
                            }
                            keys={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivNewFormControlInputLabel"
                            }
                          >
                            More Files
                          </InputLabel>
                          <Select
                            labelId={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivNewFormControlSelect"
                            }
                            id={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivNewFormControlSelect"
                            }
                            label="Category"
                            name={iFolderPO + "." + iFilePO}
                            value={filePO.documentType.name}
                            onChange={handleDocumentTypeState}
                          >
                            {props.datosDocumentTypes.length !== 0
                              ? props.datosDocumentTypes[0].data.map(
                                  (documentTypeData, iDocumentTypeData) => (
                                    <MenuItem
                                      key={
                                        props.parentPOFolder +
                                        "/" +
                                        folderPO.name +
                                        "/" +
                                        filePO.name +
                                        "-" +
                                        iFilePO +
                                        "/" +
                                        documentTypeData.name +
                                        "-" +
                                        iDocumentTypeData +
                                        "/...AcordionDetailsFolderFileDivNewFormControlSelectMenuItem"
                                      }
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
                          name={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewController"
                          }
                          control={props.control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              key={
                                props.parentPOFolder +
                                "/" +
                                folderPO.name +
                                "/" +
                                filePO.name +
                                "-" +
                                iFilePO +
                                "/...AcordionDetailsFolderFileDivNewControllerTextField"
                              }
                              className="mt-8  mx-4"
                              label={
                                filePO.name +
                                " (" +
                                filePO.documentType.name +
                                " - " +
                                filePO.documentType.extensionAllowed +
                                ")"
                              }
                              value={filePO.contentFile.name}
                              variant="outlined"
                              size="small"
                              style={{ minWidth: "50%" }}
                              disabled={true}
                              fullWidth
                            />
                          )}
                        />

                        <input
                          accept={filePO.documentType.extensionAllowed}
                          style={{ display: "none" }}
                          id={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewInput"
                          }
                          type="file"
                          disabled={
                            filePO.documentType.name === "" ? true : false
                          }
                          onChange={(event) => {
                            chooseFile(
                              event.target.files[0],
                              iFolderPO,
                              iFilePO
                            );
                          }}
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                        <label
                          htmlFor={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewInput"
                          }
                          className="mt-8  mx-4"
                          style={{ minWidth: "15%" }}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivNewInputButtonSave"
                            }
                            variant="contained"
                            color="secondary"
                            startIcon={<Icon size="small">save</Icon>}
                            size="small"
                            style={{ height: "100%" }}
                            fullWidth
                            component="span"
                            disabled={
                              filePO.documentType.name === "" ? true : false
                            }
                          >
                            Choose File
                          </Button>
                        </label>
                        <Tooltip
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewTooltip"
                          }
                          title={filePO.name}
                          placement="left"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Button
                            key={
                              props.parentPOFolder +
                              "/" +
                              folderPO.name +
                              "/" +
                              filePO.name +
                              "-" +
                              iFilePO +
                              "/...AcordionDetailsFolderFileDivNewTooltipButtonHelp"
                            }
                            variant="contained"
                            color="primary"
                            className="mt-8  mx-4"
                            size="small"
                          >
                            <Icon>help</Icon>
                          </Button>
                        </Tooltip>
                        <Button
                          variant="contained"
                          color="error"
                          className="mt-8  mx-4"
                          id={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewButtonDelete"
                          }
                          key={
                            props.parentPOFolder +
                            "/" +
                            folderPO.name +
                            "/" +
                            filePO.name +
                            "-" +
                            iFilePO +
                            "/...AcordionDetailsFolderFileDivNewButtonDelete"
                          }
                          onClick={() => handleRemoveFile(iFolderPO, iFilePO)}
                          size="small"
                        >
                          <Icon>delete</Icon>
                        </Button>
                      </div>
                    ) : (
                      false
                    )
                  )
                : false}
              {folderPO.folders.length !== 0 ? (
                <AcordionComponent
                  key={
                    props.parentPOFolder +
                    "/" +
                    folderPO.name +
                    "/...AcordionDetailsFolderRecall"
                  }
                  dataPO={folderPO}
                  handleUpdate={props.handleUpdate}
                  datosDocumentTypes={props.datosDocumentTypes}
                  folderRouteEvidenciasUVA={props.folderRouteEvidenciasUVA}
                  parentPOFolder={props.parentPOFolder + folderPO.name + "/"}
                  chooseFilesDataUpload={props.chooseFilesDataUpload}
                  setChooseFilesDataUpload={props.setChooseFilesDataUpload}
                  setFiles={props.setFiles}
                  filesGeneral={props.filesGeneral.folders[iFolderPO]}
                  chooseFilesProductFolder={props.chooseFilesProductFolder}
                  control={props.control}
                  defaultValues={props.defaultValues}
                  schema={props.schema}
                  formState={props.formState}
                  isValid={props.isValid}
                  dirtyFields={props.dirtyFields}
                  errors={props.errors}
                  setValidationYup={props.setValidationYup}
                  messageDispatch={props.messageDispatch}
                  validationFolderName={props.validationFolderName}
                />
              ) : (
                false
              )}
              {props.parentPOFolder + folderPO.name !==
              props.folderRouteEvidenciasUVA ? (
                <div
                  key={
                    props.parentPOFolder +
                    "/" +
                    folderPO.name +
                    "/...AcordionDivHr"
                  }
                  className="pt-20"
                >
                  <hr style={{ borderTop: "2px solid #bbb" }} />
                </div>
              ) : (
                false
              )}
              <div
                key={
                  props.parentPOFolder +
                  "/" +
                  folderPO.name +
                  "/...AcordionDetailsFolderDivSource"
                }
                className="flex flex-col md:flex-row -mx-8 pt-20"
              >
                <FormControl
                  key={
                    props.parentPOFolder +
                    "/" +
                    folderPO.name +
                    "/...AcordionDetailsFolderDivSourceFormControl"
                  }
                  className="w-full mt-8  mx-4"
                  size="small"
                >
                  <InputLabel
                    id={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceFormControlInputLabel"
                    }
                    key={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceFormControlInputLabel"
                    }
                  >
                    Type Source
                  </InputLabel>
                  <Select
                    labelId={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceFormControlSelect"
                    }
                    id={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceFormControlSelect"
                    }
                    key={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceFormControlSelect"
                    }
                    label="Category"
                    value={folderPO.addSourceState.state}
                    name={iFolderPO + ""}
                    onChange={handleAddSourceState}
                  >
                    {props.parentPOFolder + folderPO.name ===
                    props.folderRouteEvidenciasUVA ? (
                      <MenuItem
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/...AcordionDetailsFolderDivSourceFormControlSelectMenuItemProduct"
                        }
                        value="product"
                      >
                        <em> Product </em>
                      </MenuItem>
                    ) : (
                      false
                    )}
                    {props.parentPOFolder + folderPO.name !==
                    props.folderRouteEvidenciasUVA ? (
                      <MenuItem
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/...AcordionDetailsFolderDivSourceFormControlSelectMenuItemFolder"
                        }
                        value="folder"
                      >
                        <em> Folder </em>
                      </MenuItem>
                    ) : (
                      false
                    )}
                    {props.parentPOFolder + folderPO.name !==
                    props.folderRouteEvidenciasUVA ? (
                      <MenuItem
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/...AcordionDetailsFolderDivSourceFormControlSelectMenuItemFile"
                        }
                        value="file"
                      >
                        <em> File </em>
                      </MenuItem>
                    ) : (
                      false
                    )}
                  </Select>
                </FormControl>
                {folderPO.addSourceState.state === "folder" ? (
                  <Controller
                    name={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceControllerNewFolder"
                    }
                    key={
                      props.parentPOFolder +
                      "/" +
                      folderPO.name +
                      "/...AcordionDetailsFolderDivSourceControllerNewFolder"
                    }
                    control={props.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        key={
                          props.parentPOFolder +
                          "/" +
                          folderPO.name +
                          "/...AcordionDetailsFolderDivSourceControllerNewFolderTextField"
                        }
                        className="mt-8  mx-4"
                        label="New Folder Name"
                        name={iFolderPO + ""}
                        value={
                          props.dataPO.folders[iFolderPO].addSourceState
                            .nameFolder
                        }
                        onChange={onChangeTextNewFolder}
                        variant="outlined"
                        size="small"
                        style={{ minWidth: "40%" }}
                        fullWidth
                      />
                    )}
                  />
                ) : (
                  false
                )}
                <Button
                  id={
                    props.parentPOFolder +
                    "/" +
                    folderPO.name +
                    "/...AcordionDetailsFolderDivSourceButtonAddSourceNew"
                  }
                  key={
                    props.parentPOFolder +
                    "/" +
                    folderPO.name +
                    "/...AcordionDetailsFolderDivSourceButtonAddSourceNew"
                  }
                  variant="contained"
                  color="info"
                  className="mt-8  mx-4"
                  onClick={() => handleAdd(iFolderPO)}
                  startIcon={<Icon>add_circle</Icon>}
                  size="small"
                  style={
                    folderPO.addSourceState.state === "folder"
                      ? { minWidth: "40%" }
                      : { minWidth: "80%" }
                  }
                  fullWidth
                >
                  Add Source
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export default AcordionComponent;
