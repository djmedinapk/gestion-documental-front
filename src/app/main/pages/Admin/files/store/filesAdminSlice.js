import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getFiles = createAsyncThunk(
  "filesAdminApp/files/getFiles",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/File/WithParams", {
      params: getState().filesAdminApp.files.paramsData,
    });
    const data = await response.data;
    dispatch(changeParamsDataCount(data.count));
    return { data, routeParams };
  }
);

export const addFile = createAsyncThunk(
  "filesApp/files/addFile",
  async (file, { dispatch, getState }) => {
    const response = await axios.post("/api/File", file);
    const data = await response.data;

    dispatch(getFiles());

    return data;
  }
);

export const updateFile = createAsyncThunk(
  "filesAdminApp/files/updateFiles",
  async (fileData, { dispatch, getState }) => {
    const response = await axios.put(
      "/api/File/" + fileData.id,
      fileData
    );
    const data = await response.data;

    dispatch(getFiles());

    return data;
  }
);

export const removeFile = createAsyncThunk(
  "filesApp/files/removeFile",
  async (fileId, { dispatch, getState }) => {
    await axios.delete("/api/File/" + fileId);

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
    paramsData: {
      PageIndex: 1,
      PageSize: 10,
      Count: 0,
    },
    filesAdminDialog: {
      type: "new",
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
    changeParamsDataPageIndex: (state, action) => {
      state.paramsData.PageIndex = action.payload;
    },
    changeParamsDataPageSize: (state, action) => {
      state.paramsData.PageSize = action.payload;
    },
    changeParamsDataCount: (state, action) => {
      state.paramsData.Count = action.payload;
    },
  },
  extraReducers: {
    [getFiles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      filesAdminAdapter.setAll(state, { data });
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewFilesAdminDialog,
  closeNewFilesAdminDialog,
  openEditFilesAdminDialog,
  closeEditFilesAdminDialog,
  changeParamsDataPageIndex,
  changeParamsDataPageSize,
  changeParamsDataCount,
} = filesAdminSlice.actions;

export default filesAdminSlice.reducer;
