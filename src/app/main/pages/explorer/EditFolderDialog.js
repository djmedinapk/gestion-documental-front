import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleEditFolderDialog } from "./store/explorerSlice";
import { useCallback, useEffect } from "react";

import _ from "@lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateFolder } from "./store/folderSlice";
import { showMessage } from "app/store/fuse/messageSlice";

import { useTranslation } from "react-i18next";

const defaultValues = {
  name: "",
  description: "",
};



const EditFolderDialog = () => {
  const { t } = useTranslation("explorerPage");
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(t("YOU_MUST_ENTER_A") + " " + t("NAME")),
  });
  const dialog = useSelector(
    ({ explorerApp }) => explorerApp.explorer.editFolderDialog
  );
  const isFolder = useSelector(
    ({ explorerApp }) => explorerApp.explorer.isFolder
  );
  const routeParams = useSelector(
    ({ explorerApp }) => explorerApp.explorer.routeParams
  );
  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const initDialog = useCallback(() => {
    reset({ ...selectedItem.metadata });
  }, [selectedItem, reset]);

  useEffect(() => {
    if (dialog.open) {
      initDialog();
    }
  }, [dialog.open, initDialog]);

  const onSubmit = (data) => {
    
    dispatch(updateFolder(data)).then(({ payload }) => {
      if (payload.status === 200) {
        dispatch(
          showMessage({
            message: "Folder Edited",
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            variant: "success",
          })
        );
        dispatch(handleEditFolderDialog());
      } else {
        dispatch(
          showMessage({
            message: "Error editing folder",
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
  };

  const closeDialog = () => {
    dispatch(handleEditFolderDialog());
  };

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...dialog.props}
      open={dialog.open}
      onClose={closeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {t("EDIT_FOLDER")}
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
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
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

export default EditFolderDialog;
