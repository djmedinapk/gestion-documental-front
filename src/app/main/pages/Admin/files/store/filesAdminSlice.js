import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getFiles = createAsyncThunk(
  "filesAdminApp/files/getFiles",
  async (routeParams, { getState }) => {
    routeParams =
      routeParams || getState().filesAdminApp.files.routeParams;
    const response = await axios.getWithParams("/api/File", {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addFile = createAsyncThunk(
  'filesApp/files/addFile',
  async (file, { dispatch, getState }) => {
    const response = await axios.post('/api/File', file );
    const data = await response.data;

    dispatch(getFiles());

    return data;
  }
);

export const updateFile = createAsyncThunk(
  'filesAdminApp/files/updateFiles',
  async (fileData, { dispatch, getState }) => {
    const response = await axios.put('/api/File/'+fileData.id, fileData);
    const data = await response.data;

    dispatch(getFiles());

    return data;
  }
);

export const removeFile = createAsyncThunk(
  'filesApp/files/removeFile',
  async (fileId, { dispatch, getState }) => {
    await axios.delete('/api/File/'+fileId);

    dispatch(getFiles());

    return fileId;
  }
);

const filesAdminAdapter = createEntityAdapter({});

export const { selectAll: selectFiles } =
  filesAdminAdapter.getSelectors(
    (state) => state.filesAdminApp.files
  );

const filesAdminSlice = createSlice({
  name: "filesAdminApp/files",
  initialState: filesAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    filesAdminDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewFilesAdminDialog: (state, action) => {
      state.filesAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },

    openNewFilesAdminDialog: (state, action) => {
      state.filesAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewFilesAdminDialog: (state, action) => {
      state.filesAdminDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditFilesAdminDialog: (state, action) => {
      state.filesAdminDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditFilesAdminDialog: (state, action) => {
      state.filesAdminDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getFiles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      filesAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewFilesAdminDialog,
  closeNewFilesAdminDialog,
  openEditFilesAdminDialog,
  closeEditFilesAdminDialog,
} = filesAdminSlice.actions;

export default filesAdminSlice.reducer;
