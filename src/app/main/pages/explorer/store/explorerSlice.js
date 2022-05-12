import History from "@history";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "./../../../../services/Axios/HttpClient";

export const getFiles = createAsyncThunk(
  "explorerApp/files/getFiles",
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().explorerApp.explorer.routeParams;
    const response = await axios.getWithParams("/api/File", {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const getCurrentFolder = createAsyncThunk(
  "explorerApp/files/getCurrentFolder",
  async ({ routeParams, isFolder }, { dispatch, getState }) => {
    try {
      routeParams = routeParams || getState().explorerApp.explorer.routeParams;
      let response = null;
      if (isFolder) {
        response = await axios.getWithParams("/api/File/getCurrentFolder", {
          params: routeParams,
        });
      } else {
        response = await axios.getWithParams("/api/Project/getCurrentProject", {
          params: routeParams,
        });
      }
      const {data, status} = await response;
      if (status !== 200) {
        dispatch(
            showMessage({
              message: "Project not found",
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical  : 'bottom',
                horizontal: 'center'
              },
              variant: 'error'
            })
          );
          History.push({
            pathname: "/projects",
          });
          return { data: null, routeParams, isFolder };
      }
      return { data, routeParams, isFolder };
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical  : 'bottom',
            horizontal: 'center'
          },
        })
      );
      history.push({
        pathname: "/projects",
      });
      return {data: null, routeParams, isFolder};
    }
  }
);

export const removeProject = createAsyncThunk(
  "explorerApp/files/removeProject",
  async (projectId, { dispatch, getState }) => {
    const { status } = await axios.delete("/api/Project/" + projectId);
    return status;
  }
);

const explorerAdapter = createEntityAdapter({});

export const { selectAll: selectFiles } = explorerAdapter.getSelectors(
  (state) => state.explorerApp.files
);

const explorerSlice = createSlice({
  name: "explorerApp/files",
  initialState: explorerAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    isFolder: false,
    projectData: null,
    folderData: null,
    newFolderDialog: {
      open: false
    }
  }),
  reducers: {
    handleNewFolderDialog: (state, action) => {
      state.newFolderDialog = {
        open: !state.newFolderDialog.open
      }
    }
  },
  extraReducers: {
    [getFiles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      explorerAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
    [getCurrentFolder.fulfilled]: (state, action) => {
      const { data, routeParams, isFolder } = action.payload;
      state.folderData = data;
      state.routeParams = routeParams;
      state.isFolder = isFolder;
      if (!isFolder) {
        state.projectData = data;
      }
    },
    [removeProject.fulfilled]: (state, action) =>
      explorerAdapter.removeOne(state, action.payload),
  },
});

export const {
  handleNewFolderDialog
} = explorerSlice.actions;

export default explorerSlice.reducer;
