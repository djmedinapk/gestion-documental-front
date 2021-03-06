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
import { addProjectBoard, handleDialog } from "./store/projectsSlice";

import _ from "@lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const defaultValues = {
  name: "",
  code: "",
  description: "",
};



const ProjectDialog = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("projectPage");
  const projectDialog = useSelector(({ projectApp }) => projectApp.projects.dialog);


  const schema = yup.object().shape({
    name: yup.string().required(t("YOU_MUST_ENTER_A") + " " + t("NAME")),
    code: yup.string().max(5).required(t("YOU_MUST_ENTER_A") + " " + t("CODE"))
  });

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const  onSubmit = (data) => {
    //console.log("dataForm",data);
    dispatch(addProjectBoard(data));
    dispatch(handleDialog());
  }

  const closeDialog = () => {
    dispatch(handleDialog())
  }

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...projectDialog.props}
      open= {projectDialog.open}
      onClose={closeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {t("NEW_PROJECT")}
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
              name="code"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t("CODE")}
                  id="code"
                  error={!!errors.code}
                  helperText={errors?.code?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
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
              {t("ADD")}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectDialog;
