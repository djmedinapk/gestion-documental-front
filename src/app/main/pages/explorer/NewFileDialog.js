import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { handleNewFileDialog } from "./store/explorerSlice";

import _ from "@lodash";
import * as yup from "yup";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { selectDocumentTypes } from "./store/documentTypeSlice";
import { useParams } from "react-router";
import { addFile } from "./store/fileSlice";
import { showMessage } from "app/store/fuse/messageSlice";

const defaultValues = {
  name: "",
  file: "",
  description: "",
  documentTypeId: 0,
};
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  description: yup.string().required("You must enter a description"),
  documentTypeId: yup
    .number()
    .required("You must select a Document Type")
    .min(1),
  file: yup.string().required("You must select a file"),
});

const NewFileDialog = () => {
  const { t } = useTranslation("fileAdminPage");
  const dispatch = useDispatch();
  const dialog = useSelector(
    ({ explorerApp }) => explorerApp.explorer.newFileDialog
  );
  const isFolder = useSelector(
    ({ explorerApp }) => explorerApp.explorer.isFolder
  );
  const documentsType = useSelector(selectDocumentTypes);
  const routeParams = useParams();

  const { control, reset, handleSubmit, formState, getValues, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const [fileSelected, setFileSelected] = useState(null);
  
  useEffect(() => {
  },[documentsType])


  function onSubmit(data) {
    const datos = new FormData(); 
    datos.append('name', data.name);
    datos.append('description', data.description);
    datos.append('documentTypeId', data.documentTypeId);
    datos.append('file',fileSelected);
    if (isFolder && routeParams.id) {
      datos.append('folderId', parseInt(routeParams.id,10));
    }else {
      datos.append('projectId', parseInt(routeParams.id,10));
    }
    dispatch(addFile(datos)).then(({ payload }) => {
      if (payload.status === 200) {
        dispatch(
          showMessage({
            message: "File created",
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            variant: "success",
          })
        );
        closeDialog();
      } else {
        dispatch(
          showMessage({
            message: "Error creating File",
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      }
    });
  }

  const onChangeFileSelected = (file) => {
    if (file) {
      setFileSelected(file);
      setValue('name',file.name)
    }
    else {
      setFileSelected(null)
      setValue('name','')
    }
  }

  const closeDialog = () => {
    dispatch(handleNewFileDialog());
  };

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...dialog}
      onClose={closeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {t("NEW_FILE")}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t("NAME")}
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="documentTypeId"
              render={({ field }) => (
                <>
                  <FormControl className="w-full">
                    <InputLabel id="category-select-label">
                      Document Type
                    </InputLabel>
                    <Select
                      {...field}
                      className="mb-24"
                      labelId="category-select-label"
                      id="category-select"
                      label="Document Type"
                      name="documentTypeId"
                      error={!!errors.documentTypeId}
                      fullWidth
                    >
                      {documentsType && documentsType.length > 0 ?  (
                        documentsType.map(doc => (
                          <MenuItem key={doc.id} value={doc.id}>
                          <em> {doc.name} </em>
                        </MenuItem>
                        ))
                      ):''}
                    </Select>
                  </FormControl>
                </>
              )}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label={t('DESCRIPTION')}
                    id="description"
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">insert_drive_file</Icon>
            </div>
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <>
                  <input
                    accept="*"
                    style={{ display: "none" }}
                    id={"file-upload"}
                    name="file"
                    type="file"
                    onChange={(event) => {
                      field.onChange(event);
                      onChangeFileSelected(event.target.files[0]);
                    }}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                  />
                  <label htmlFor={"file-upload"} className="mt-8  mx-4 w-full">                      
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Icon size="small">save</Icon>}
                      fullWidth
                      component="span"
                    >
                      Choose File
                    </Button><br/>
                    <span>{field.value}</span>
                  </label>
                </>
              )}
            />            
          </div>
        </DialogContent>
        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              {t("ADD")}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewFileDialog;
