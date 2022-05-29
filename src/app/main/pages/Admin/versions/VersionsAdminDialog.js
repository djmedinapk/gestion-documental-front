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
  removeVersion,
  updateVersion,
  addVersion,
  closeNewVersionsAdminDialog,
  closeEditVersionsAdminDialog,
} from './store/versionsAdminSlice';

const defaultValues = {
  id: 0,
  fileVersion: '',
  url: '',
  archivedDate: '',
  fileId: '',
};

/**
 * Form Validation Schema
 */


function VersionsAdminDialog(props) {
  
  const { t } = useTranslation('versionAdminPage');
  const schema = yup.object().shape({
    fileVersion: yup.string().required(t("YOU_MUST_ENTER_A")+" "+t("FILE_VERSION")),
    url: yup.string().required(t("YOU_MUST_ENTER_A")+" "+t("URL")),
    archivedDate: yup.string().required(t("YOU_MUST_ENTER_A")+" "+t("ARCHIVED_DATE")),
    fileId: yup.string().required(t("YOU_MUST_ENTER_A")+" "+t("FILE_ID")),
  });
  const dispatch = useDispatch();
  const versionsAdminDialog = useSelector(({ versionsAdminApp }) => versionsAdminApp.versions.versionsAdminDialog);

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
    if (versionsAdminDialog.type === 'edit' && versionsAdminDialog.data) {
      reset({ ...versionsAdminDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (versionsAdminDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...versionsAdminDialog.data,
      });
    }
  }, [versionsAdminDialog.data, versionsAdminDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (versionsAdminDialog.props.open) {
      initDialog();
    }
  }, [versionsAdminDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return versionsAdminDialog.type === 'edit'
      ? dispatch(closeEditVersionsAdminDialog())
      : dispatch(closeNewVersionsAdminDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (versionsAdminDialog.type === 'new') {
      dispatch(addVersion(data));
    } else {
      dispatch(updateVersion({ ...versionsAdminDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeVersion(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...versionsAdminDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {versionsAdminDialog.type === 'new' ? t('NEW_VERSION') : t('EDIT_VERSION')}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          {versionsAdminDialog.type === 'edit' && (
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
              name="fileVersion"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t('FILE_VERSION')}
                  id="fileVersion"
                  error={!!errors.fileVersion}
                  helperText={errors?.fileVersion?.message}
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
              name="url"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t('URL')}
                  id="url"
                  error={!!errors.url}
                  helperText={errors?.url?.message}
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
              name="archivedDate"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t('ARCHIVED_DATE')}
                  id="archivedDate"
                  error={!!errors.archivedDate}
                  helperText={errors?.archivedDate?.message}
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
              name="fileId"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t('FILE_ID')}
                  id="fileId"
                  error={!!errors.fileId}
                  helperText={errors?.fileId?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {versionsAdminDialog.type === 'new' ? (
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

export default VersionsAdminDialog;
