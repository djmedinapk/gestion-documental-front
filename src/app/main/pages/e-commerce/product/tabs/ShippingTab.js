import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";

import { useDeepCompareEffect } from "@fuse/hooks";

import { changeDatosPOs } from "./../../store/productsSlice";
import { selectProductTypes } from "./../../store/productTypesAdminSlice";
import { selectDocumentTypes } from "./../../store/documentTypesAdminSlice";
import { months, currentYear } from "./../../store/Params";

const ShippingTab = () => {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control } = methods;

  const navigate = useNavigate();

  const datosSS = JSON.parse(
    JSON.stringify(
      useSelector(({ eCommerceApp }) => eCommerceApp.products.datosPOs)
    )
  );

  const dataClient = JSON.parse(
    JSON.stringify(
      useSelector(({ globalParams }) => globalParams.generalParams.newPO.client)
    )
  );

  const [chooseFilesDataUpload, setChooseFilesDataUpload] = useState([]);

  const datosProductTypes = useSelector(selectProductTypes);

  const datosDocumentTypes = useSelector(selectDocumentTypes);

  const [dataYears, setDataYears] = useState([]);

  useDeepCompareEffect(() => {
    if (dataClient.id === 0 && dataClient.name === "") {
      navigate("/projects");
    }
    setDataYears(getYearsData());
  }, [dispatch, datosProductTypes, datosDocumentTypes]);

  useEffect(() => {}, [datosProductTypes]);

  const handleUpdate = () => {
    dispatch(changeDatosPOs(datosSS));
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
    handleUpdate();
  };

  const handleAdd = () => {
    if (datosSS.addSourceState.state === "folder") {
      datosSS.folders.push({
        name: datosSS.addSourceState.nameFolder,
        statePO: "new",
        accordionState: datosSS.addSourceState.nameFolder,
        addSourceState: { state: "", nameFolder: "" },
        files: [],
        folders: [],
      });
    } else if (datosSS.addSourceState.state === "file") {
      datosSS.files.push({
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
    }
    datosSS.addSourceState.state = "";
    datosSS.addSourceState.nameFolder = "";

    handleUpdate();
  };

  const handleRemoveFile = (indexFile) => {
    datosSS.files.splice(indexFile, 1);
    handleUpdate();
  };

  function handleAddSourceState(ev) {
    datosSS.addSourceState.state = ev.target.value;
    handleUpdate();
  }

  const onChangeTextNewFolder = (ev) => {
    datosSS.addSourceState.nameFolder = ev.target.value;
    handleUpdate();
    console.log(datosSS.addSourceState.nameFolder);
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
    datosSS.files[ev.target.name].documentType.name = ev.target.value;
    handleUpdate();
  };

  const getYearsData = () => {
    const years = [];

    for (let index = currentYear; index > currentYear - 5; index--) {
      years.push({ name: index });
    }

    return years;
  };

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="width"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label="PO"
              autoFocus
              id="width"
              size="small"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="depth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label="Pediment"
              id="depth"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
      </div>
      <div className="flex -mx-4">
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Year</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            value={datosSS.year}
            onChange={handleYearPOState}
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
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Month</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            value={datosSS.month}
            onChange={handleMonthPOState}
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
      </div>
      <div className="flex -mx-4">
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Type</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            value={datosSS.productType}
            onChange={handleProductTypePOState}
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
        <Controller
          name="width"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label="Client"
              autoFocus
              id="width"
              size="small"
              variant="outlined"
              disabled={true}
              fullWidth
              value={dataClient.name}
            />
          )}
        />
      </div>
      <AcordionComponent
        //map={map}
        dataPO={datosSS}
        control={control}
        handleUpdate={handleUpdate}
        chooseFilesDataUpload={chooseFilesDataUpload}
        setChooseFilesDataUpload={setChooseFilesDataUpload}
        datosDocumentTypes={datosDocumentTypes}
      />

      <div style={{ paddingTop: "25px" }}>
        {datosSS.files !== null ? (
          datosSS.files.map((file, i) =>
            file.statePO === "old" ? (
              <div key={i} className="flex flex-col md:flex-row -mx-8">
                {console.log(file)}
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
                  accept="image/*"
                  style={{ display: "none" }}
                  id={file.name + i + "fuGeneral"}
                  multiple
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
                      label={file.name}
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
                  accept="image/*"
                  style={{ display: "none" }}
                  id={file.name + i + "fu"}
                  multiple
                  type="file"
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
        ></Button>
      </div>
      <div className="pt-20">
        <hr style={{ borderTop: "3px solid #bbb" }} />
      </div>
    </div>
  );
};

const AcordionComponent = (props) => {
  const dispatch = useDispatch();

  const params = useSelector(
    ({ eCommerceApp }) => eCommerceApp.products.datosPOs
  );

  useEffect(() => {}, [props, params]);

  const handleAccordionState = (indexFolder, folder) => {
    if (props.dataPO.folders[indexFolder].accordionState !== folder.name) {
      props.dataPO.folders[indexFolder].accordionState = folder.name;
    } else {
      props.dataPO.folders[indexFolder].accordionState = false;
    }
    props.handleUpdate();
  };

  const chooseFile = (event, indexFolder, indexFile) => {
    props.setChooseFilesDataUpload({
      ...props.chooseFilesDataUpload,
      [Object.keys(props.chooseFilesDataUpload).length + ""]: event,
    });
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

  const handleAdd = (indexFolder) => {
    if (props.dataPO.folders[indexFolder].addSourceState.state === "folder") {
      props.dataPO.folders[indexFolder].folders.push({
        name: props.dataPO.folders[indexFolder].addSourceState.nameFolder,
        statePO: "new",
        accordionState:
          props.dataPO.folders[indexFolder].addSourceState.nameFolder,
        addSourceState: { state: "", nameFolder: "" },
        files: [],
        folders: [],
      });
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
    }
    props.dataPO.folders[indexFolder].addSourceState.state = "";
    props.dataPO.folders[indexFolder].addSourceState.nameFolder = "";

    props.handleUpdate();
  };

  const handleRemoveFolder = (index) => {
    props.dataPO.folders.splice(index, 1);
    props.handleUpdate();
  };

  const handleRemoveFile = (indexFolder, indexFile) => {
    props.dataPO.folders[indexFolder].files.splice(indexFile, 1);
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
    console.log(props.dataPO.folders[ev.target.name].addSourceState.nameFolder);
  };

  const handleDocumentTypeState = (ev) => {
    var arrayIndex = ev.target.name.split(".");
    props.dataPO.folders[arrayIndex[0]].files[arrayIndex[1]].documentType.name =
      ev.target.value;
    props.handleUpdate();
  };

  return (
    <>
      {props.dataPO.folders.map((folderPO, iFolderPO) => (
        <>
          <div
            style={{ justifyContent: "end", display: "flex", paddingTop: "2%" }}
          >
            {folderPO.statePO === "new" ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveFolder(iFolderPO)}
                size="small"
                style={{ maxWidth: "10%" }}
              >
                <Icon>delete</Icon>
              </Button>
            ) : (
              <></>
            )}
          </div>
          <Accordion
            className="border-0 shadow-0 overflow-hidden"
            expanded={folderPO.name === folderPO.accordionState}
            onChange={() => handleAccordionState(iFolderPO, folderPO)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: "border border-solid rounded-16 mt-8" }}
            >
              <div
                style={{
                  justifyContent: "space-between",
                  display: "inline-flex",
                  minWidth: "95%",
                }}
              >
                <Typography
                  className="font-semibold"
                  style={{ alignSelf: "center" }}
                >
                  {folderPO.name}
                </Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              {folderPO.files !== null ? (
                folderPO.files.map((file, i) =>
                  file.statePO === "old" ? (
                    <div key={i} className="flex flex-col md:flex-row -mx-8">
                      <Controller
                        name={file.name}
                        control={props.control}
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
                        accept="image/*"
                        style={{ display: "none" }}
                        id={file.name + i + "fu"}
                        multiple
                        type="file"
                        onChange={(event) => {
                          chooseFile(event.target.files[0], iFolderPO, i);
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
                        <InputLabel id="category-select-label">
                          More Files
                        </InputLabel>
                        <Select
                          labelId="category-select-label"
                          id="category-select"
                          label="Category"
                          name={iFolderPO + "." + i}
                          value={file.documentType.name}
                          onChange={handleDocumentTypeState}
                        >
                          {props.datosDocumentTypes.length !== 0
                            ? props.datosDocumentTypes[0].data.map(
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
                        control={props.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mt-8  mx-4"
                            label={file.name}
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
                        accept="image/*"
                        style={{ display: "none" }}
                        id={file.name + i + "fu"}
                        multiple
                        type="file"
                        onChange={(event) => {
                          chooseFile(event.target.files[0], iFolderPO, i);
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
                        onClick={() => handleRemoveFile(iFolderPO, i)}
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
              <AcordionComponent
                dataPO={folderPO}
                control={props.control}
                handleUpdate={props.handleUpdate}
                datosDocumentTypes={props.datosDocumentTypes}
              />

              <div className="flex flex-col md:flex-row -mx-8 pt-20">
                <FormControl className="w-full mt-8  mx-4" size="small">
                  <InputLabel
                    id={folderPO.name + "selectNewResource" + iFolderPO}
                  >
                    Type Source
                  </InputLabel>
                  <Select
                    labelId={folderPO.name + "selectNewResource" + iFolderPO}
                    id={folderPO.name + "categorySelectNewResource" + iFolderPO}
                    label="Category"
                    value={folderPO.addSourceState.state}
                    name={iFolderPO + ""}
                    onChange={handleAddSourceState}
                  >
                    <MenuItem
                      key={
                        folderPO.name +
                        "menuItemSelectNewResourceFolder" +
                        iFolderPO
                      }
                      value="folder"
                    >
                      <em> Folder </em>
                    </MenuItem>
                    <MenuItem
                      key={
                        folderPO.name +
                        "menuItemSelectNewResourceFile" +
                        iFolderPO
                      }
                      value="file"
                    >
                      <em> File </em>
                    </MenuItem>
                  </Select>
                </FormControl>
                {folderPO.addSourceState.state === "folder" ? (
                  <Controller
                    name="New Folderf"
                    control={props.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8  mx-4"
                        label="New Folder"
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
                  <></>
                )}
                <Button
                  id={folderPO.name + "addNewFileFolder"}
                  key={folderPO.name + "addNewFileFolder"}
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
                ></Button>
              </div>
              <div className="pt-20">
                <hr style={{ borderTop: "3px solid #bbb" }} />
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
};

export default ShippingTab;
