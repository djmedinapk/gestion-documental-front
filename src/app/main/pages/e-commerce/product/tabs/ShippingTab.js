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

import { changeDatosPOs, fileUp } from "./../../store/productsSlice";
import { selectProductTypes } from "./../../store/productTypesAdminSlice";
import { selectDocumentTypes } from "./../../store/documentTypesAdminSlice";
import { months, currentYear } from "./../../store/Params";

const ShippingTab = () => {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const navigate = useNavigate();

  const datosSS = JSON.parse(
    JSON.stringify(
      useSelector(({ eCommerceApp }) => eCommerceApp.products.datosPOs)
    )
  );

  const datosSS2 = useSelector(
    ({ eCommerceApp }) => eCommerceApp.products.datosPOs
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

  //validation

  const defaultValues = {
    name: "",
    pediment: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required("You must enter a name"),
    pediment: yup.string().required("You must enter a pediment"),
  });

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      validationSchema: defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const po = watch("po");
  const pediment = watch("pediment");

  //--------------------------------

  useDeepCompareEffect(() => {
    /*if (dataClient.id === 0 && dataClient.name === "") {
      navigate("/projects");
    } else {
      datosSS.client.id = dataClient.id;
      datosSS.client.name = dataClient.name;
      handleUpdate();
    }*/
    setDataYears(getYearsData());
  }, [dispatch, datosProductTypes, datosDocumentTypes]);

  useEffect(() => {
    initDialog();
  }, [datosProductTypes]);

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
    //filesGeneral.folders[2].folders[0].products[indexProduct].files = [...filesGeneral.folders[2].folders[0].products[indexProduct].files,...event];
    setFiles(files);
    handleUpdate();
  };

  const setFiles = (files) => {
    setChooseFilesDataUpload([...chooseFilesDataUpload, ...files]);
  };

  const initDialog = useCallback(() => {
    reset({
      ...defaultValues,
      ...datosSS2,
    });
  }, [datosSS2, reset]);

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
  };

  const handleNamePOState = (ev) => {
    datosSS.name = ev.target.value;
    if (datosSS.name === "") {
      errors.name = true;
    } else {
      errors.name = false;
    }
    handleUpdate();
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

  const handleSaveDataPO = () => {
    //console.log("este",filesGeneral);
    //dispatch(fileUp({ files: filesGeneral, data: datosSS }));
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
        >
          Save
        </Button>
      </div>

      <div className="flex -mx-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label="PO"
              id="name"
              size="small"
              variant="outlined"
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name ? "errgd" : false}
              value={datosSS.name}
              onChange={handleNamePOState}
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
              required
              error={!!errors.pediment}
              helperText={errors?.pediment?.message}
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
      {filesGeneral ? (
        <AcordionComponent
          key={"key:" + datosSS.name}
          dataPO={datosSS}
          control={control}
          handleUpdate={handleUpdate}
          setFiles={setFiles}
          chooseFilesDataUpload={chooseFilesDataUpload}
          setChooseFilesDataUpload={setChooseFilesDataUpload}
          datosDocumentTypes={datosDocumentTypes}
          folderRouteEvidenciasUVA={datosSS.name + "/UVA/Evidencias"}
          parentPOFolder={datosSS.name + "/"}
          filesGeneral={filesGeneral}
          chooseFilesProductFolder={chooseFilesProductFolder}
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
                  accept="image/*"
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
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ShippingTab;
