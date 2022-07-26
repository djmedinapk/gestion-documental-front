import History from "@history";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "./../../../../services/Axios/HttpClient";
import { getCurrentFolder } from "./explorerSlice";

export const addFolder = createAsyncThunk(
  "folderApp/folder/addFolder",
  async (folder, { dispatch, getState }) => {
    const response = await axios.post("/api/Folder", folder);
    const { data, status } = await response;
    const routeParams = getState().explorerApp.explorer.routeParams;
    const isFolder = getState().explorerApp.explorer.isFolder;
    dispatch(getCurrentFolder({ routeParams, isFolder }));
    return { data, status };
  }
);

export const updateFolder = createAsyncThunk(
  "folderApp/folder/updateFolder",
  async (folderData, { dispatch, getState }) => {
    const response = await axios.put(
      "/api/Folder/editFolderExplorer/" + folderData.id,
      folderData
    );
    const { data, status } = await response;

    const routeParams = getState().explorerApp.explorer.routeParams;
    const isFolder = getState().explorerApp.explorer.isFolder;
    dispatch(getCurrentFolder({ routeParams, isFolder }));

    return { data, status };
  }
);

export const removeFolder = createAsyncThunk(
  "folderApp/folder/removeFolder",
  async (folderId, { dispatch, getState }) => {
    const response = await axios.delete(
      "/api/Folder/deleteUploadFolder/" + folderId
    );
    const { data, status } = await response;
    const routeParams = getState().explorerApp.explorer.routeParams;
    const isFolder = getState().explorerApp.explorer.isFolder;
    dispatch(getCurrentFolder({ routeParams, isFolder }));
    return { data, status };
  }
);

const folderAdapter = createEntityAdapter({});

const folderSlice = createSlice({
  name: "folderApp/folder",
  initialState: folderAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [addFolder.fulfilled]: folderAdapter.addOne,
  },
});

// export const {
// } = folderSlice.actions;

export default folderSlice.reducer;
