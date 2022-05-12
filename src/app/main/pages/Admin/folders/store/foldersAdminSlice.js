import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getFolders = createAsyncThunk(
  "foldersAdminApp/folders/getFolders",
  async (routeParams, { getState }) => {
    routeParams =
      routeParams || getState().foldersAdminApp.folders.routeParams;
    const response = await axios.getWithParams("/api/Folder", {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addFolder = createAsyncThunk(
  'foldersApp/folders/addFolder',
  async (folder, { dispatch, getState }) => {
    const response = await axios.post('/api/Folder', folder );
    const data = await response.data;

    dispatch(getFolders());

    return data;
  }
);

export const updateFolder = createAsyncThunk(
  'foldersAdminApp/folders/updateFolders',
  async (folderData, { dispatch, getState }) => {
    const response = await axios.put('/api/Folder/'+folderData.id, folderData);
    const data = await response.data;

    dispatch(getFolders());

    return data;
  }
);

export const removeFolder = createAsyncThunk(
  'foldersApp/folders/removeFolder',
  async (folderId, { dispatch, getState }) => {
    await axios.delete('/api/Folder/'+folderId);

    dispatch(getFolders());

    return folderId;
  }
);

const foldersAdminAdapter = createEntityAdapter({});

export const { selectAll: selectFolders } =
  foldersAdminAdapter.getSelectors(
    (state) => state.foldersAdminApp.folders
  );

const foldersAdminSlice = createSlice({
  name: "foldersAdminApp/folders",
  initialState: foldersAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    foldersAdminDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewFoldersAdminDialog: (state, action) => {
      state.foldersAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },

    openNewFoldersAdminDialog: (state, action) => {
      state.foldersAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewFoldersAdminDialog: (state, action) => {
      state.foldersAdminDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditFoldersAdminDialog: (state, action) => {
      state.foldersAdminDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditFoldersAdminDialog: (state, action) => {
      state.foldersAdminDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getFolders.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      foldersAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewFoldersAdminDialog,
  closeNewFoldersAdminDialog,
  openEditFoldersAdminDialog,
  closeEditFoldersAdminDialog,
} = foldersAdminSlice.actions;

export default foldersAdminSlice.reducer;
