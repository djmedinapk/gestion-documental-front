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
  removeFile,
  updateFile,
  addFile,
  closeNewFilesAdminDialog,
  closeEditFilesAdminDialog,
} from './store/filesAdminSlice';

const defaultValues = {
  id: 0,
  name: '',
  description: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  description: yup.string().required('You must enter a description'),
});

function FilesAdminDialog(props) {
  const { t } = useTranslation('fileAdminPage');
  const dispatch = useDispatch();
  const filesAdminDialog = useSelector(({ filesAdminApp }) => filesAdminApp.files.filesAdminDialog);

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
    if (filesAdminDialog.type === 'edit' && filesAdminDialog.data) {
      reset({ ...filesAdminDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (filesAdminDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...filesAdminDialog.data,
      });
    }
  }, [filesAdminDialog.data, filesAdminDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (filesAdminDialog.props.open) {
      initDialog();
    }
  }, [filesAdminDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return filesAdminDialog.type === 'edit'
      ? dispatch(closeEditFilesAdminDialog())
      : dispatch(closeNewFilesAdminDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (filesAdminDialog.type === 'new') {
      dispatch(addFile(data));
    } else {
      dispatch(updateFile({ ...filesAdminDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeFile(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...filesAdminDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {filesAdminDialog.type === 'new' ? t('NEW_FILE') : t('EDIT_FILE')}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          {filesAdminDialog.type === 'edit' && (
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
              <Icon color="action">account_circle</Icon>
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
        </DialogContent>

        {filesAdminDialog.type === 'new' ? (
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

export default FilesAdminDialog;
