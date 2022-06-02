import History from "@history";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "./../../../../services/Axios/HttpClient";
import { getCurrentFolder } from "./explorerSlice";

export const addFile = createAsyncThunk(
  'fileApp/file/addFile',
  async (file, { dispatch, getState }) => {
    const response = await axios.post('/api/File/uploadfile',  file );
    const {data, status} = await response;
    const routeParams = getState().explorerApp.explorer.routeParams;
    const isFolder = getState().explorerApp.explorer.isFolder;
    dispatch(getCurrentFolder({ routeParams, isFolder }))
    return {data, status};
  }
);

export const updateFile = createAsyncThunk(
  "fileApp/file/updateFile",
  async (fileData, { dispatch, getState }) => {
    const response = await axios.put('/api/File/editUploadFile',  fileData );
    const {data, status} = await response;
    const routeParams = getState().explorerApp.explorer.routeParams;
    const isFolder = getState().explorerApp.explorer.isFolder;
    dispatch(getCurrentFolder({ routeParams, isFolder }))
    return {data, status};
  }
);

const fileAdapter = createEntityAdapter({});


const fileSlice = createSlice({
  name: "fileApp/file",
  initialState: fileAdapter.getInitialState({
  }),
  reducers: {},
  extraReducers: {    
    [addFile.fulfilled]: fileAdapter.addOne,
  },
});

// export const {
// } = fileSlice.actions;

export default fileSlice.reducer;
