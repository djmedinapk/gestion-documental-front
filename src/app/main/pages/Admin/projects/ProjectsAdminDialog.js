import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeProject,
  updateProject,
  addProject,
  closeNewProjectsAdminDialog,
  closeEditProjectsAdminDialog,
} from './store/projectsAdminSlice';

const defaultValues = {
  id: 0,
  name: '',
  description: '',
  code: '',
};

/**
 * Form Validation Schema
 */


function ProjectsAdminDialog(props) {
  
  const { t } = useTranslation('projectAdminPage');
  const schema = yup.object().shape({
    name: yup.string().required(t("YOU_MUST_ENTER_A")+" "+t("NAME")),
  });
  const dispatch = useDispatch();
  const projectsAdminDialog = useSelector(({ projectsAdminApp }) => projectsAdminApp.projects.projectsAdminDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const description = watch('description');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (projectsAdminDialog.type === 'edit' && projectsAdminDialog.data) {
      reset({ ...projectsAdminDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (projectsAdminDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...projectsAdminDialog.data,
      });
    }
  }, [projectsAdminDialog.data, projectsAdminDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (projectsAdminDialog.props.open) {
      initDialog();
    }
  }, [projectsAdminDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return projectsAdminDialog.type === 'edit'
      ? dispatch(closeEditProjectsAdminDialog())
      : dispatch(closeNewProjectsAdminDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (projectsAdminDialog.type === 'new') {
      dispatch(addProject(data));
    } else {
      dispatch(updateProject({ ...projectsAdminDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeProject(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...projectsAdminDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {projectsAdminDialog.type === 'new' ? t('NEW_PROJECT') : t('EDIT_PROJECT')}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          {projectsAdminDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
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
                  label={t('NAME')}
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
                  label={t('DESCRIPTION')}
                  id="description"
                  variant="outlined"
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
              name="code"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t('CODE')}
                  id="code"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {projectsAdminDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                {t('ADD')}
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                {t('SAVE')}
              </Button>
            </div>
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ProjectsAdminDialog;
