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
import { handleEditFileDialog } from "./store/explorerSlice";

import _ from "@lodash";
import * as yup from "yup";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { selectDocumentTypes } from "./store/documentTypeSlice";
import { useParams } from "react-router";
import { updateFile } from "./store/fileSlice";
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

const EditFileDialog = () => {
  const { t } = useTranslation("explorerPage");
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(t("YOU_MUST_ENTER_A") + " " + t("NAME")),
    description: yup
      .string()
      .required(t("YOU_MUST_ENTER_A") + " " + t("DESCRIPTION")),
  });
  const dialog = useSelector(
    ({ explorerApp }) => explorerApp.explorer.editFileDialog
  );
  const isFolder = useSelector(
    ({ explorerApp }) => explorerApp.explorer.isFolder
  );

  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const documentsType = useSelector(selectDocumentTypes);
  const routeParams = useParams();

  const { control, reset, handleSubmit, formState, getValues, setValue } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { isValid, dirtyFields, errors } = formState;
  const [fileSelected, setFileSelected] = useState(null);
  const [typeFileSelected, setTypeFileSelected] = useState("*");

  const initDialog = useCallback(() => {
    reset({ ...selectedItem.metadata });
    documentsType.forEach((documentTypeElement) => {
      if (documentTypeElement.id === selectedItem.metadata.documentTypeId) {
        setTypeFileSelected(documentTypeElement.extensionAllowed);
      }
    });
  }, [selectedItem, reset]);

  useEffect(() => {
    if (dialog.open) {
      initDialog();
    }
  }, [dialog.open, initDialog]);

  useEffect(() => {
    if (getValues("documentTypeId") === 0) {
      setValue("documentTypeId", "");
    }
  }, [documentsType]);

  function onSubmit(data) {
    const datos = new FormData();
    datos.append("id", data.id);
    datos.append("name", data.name);
    datos.append("nameOld", selectedItem.metadata.name);
    datos.append("description", data.description);
    datos.append("url", data.url);
    if (data.folderId !== null) {
      datos.append("folderId", data.folderId);
    }
    if (data.projectId !== null) {
      datos.append("projectId", data.projectId);
    }
    datos.append("documentTypeId", data.documentTypeId);
    datos.append("file", fileSelected);

    dispatch(updateFile(datos)).then(({ payload }) => {
      if (payload.status === 200) {
        dispatch(
          showMessage({
            message: "File updated",
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
            message: "Error updated File",
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
      setValue("name", file.name);
    } else {
      setFileSelected(null);
      setValue("name", "");
      setTypeFileSelected("*");
    }
  };

  const closeDialog = () => {
    dispatch(handleEditFileDialog());
    setValue("name", "");
    setValue("documentTypeId", "");
    setValue("description", "");
    setFileSelected(null);
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
            {t("EDIT_FILE")}
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
              <Icon color="action">article</Icon>
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
              <Icon color="action">article</Icon>
            </div>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t("DESCRIPTION")}
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
                    accept={typeFileSelected}
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
                      {t("CHOOSE_FILE")}
                    </Button>
                    <br />
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
              {t("SAVE")}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditFileDialog;
