import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getDocumentTypes = createAsyncThunk(
  "poGeneralTemplateApp/documentTypes/getDocumentTypes",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/DocumentType/WithParams", {
      params: getState().poGeneralTemplateApp.documentTypes.paramsData,
    });
    const data = await response.data;
    dispatch(changeParamsDataCount(data.count));
    return { data, routeParams };
  }
);

export const addDocumentType = createAsyncThunk(
  "documentTypesApp/documentTypes/addDocumentType",
  async (documentType, { dispatch, getState }) => {
    const response = await axios.post("/api/DocumentType", documentType);
    const data = await response.data;

    dispatch(getDocumentTypes());

    return data;
  }
);

export const updateDocumentType = createAsyncThunk(
  "poGeneralTemplateApp/documentTypes/updateDocumentTypes",
  async (documentTypeData, { dispatch, getState }) => {
    const response = await axios.put(
      "/api/DocumentType/" + documentTypeData.id,
      documentTypeData
    );
    const data = await response.data;

    dispatch(getDocumentTypes());

    return data;
  }
);

export const removeDocumentType = createAsyncThunk(
  "documentTypesApp/documentTypes/removeDocumentType",
  async (documentTypeId, { dispatch, getState }) => {
    await axios.delete("/api/DocumentType/" + documentTypeId);

    dispatch(getDocumentTypes());

    return documentTypeId;
  }
);

export const fileUp = createAsyncThunk(
  "documentTypesApp/documentTypes/addDocumentType",
  async (selectedFile, { dispatch, getState }) => {
    const formData = new FormData();
    const dataPe = JSON.stringify({
      name: "eme",
      description: "description",
    });

    for (var i = 0; i < Object.keys(selectedFile).length+1; i++) {
      formData.append(i + "", selectedFile[i])
    } 
    formData.append("datos", dataPe);
    const response = await axios.post("/api/DocumentType/file", formData);
    const data = await response.data;

    dispatch(getDocumentTypes());

    return data;
  }
);

const documentTypesAdminAdapter = createEntityAdapter({});

export const { selectAll: selectDocumentTypes } =
  documentTypesAdminAdapter.getSelectors(
    (state) => state.poGeneralTemplateApp.documentTypes
  );

const documentTypesAdminSlice = createSlice({
  name: "poGeneralTemplateApp/documentTypes",
  initialState: documentTypesAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    paramsData: {
      PageIndex: 1,
      PageSize: 100,
      Count: 0,
    },
    files: {},
    documentTypesAdminDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewDocumentTypesAdminDialog: (state, action) => {
      state.documentTypesAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },

    openNewDocumentTypesAdminDialog: (state, action) => {
      state.documentTypesAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewDocumentTypesAdminDialog: (state, action) => {
      state.documentTypesAdminDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditDocumentTypesAdminDialog: (state, action) => {
      state.documentTypesAdminDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditDocumentTypesAdminDialog: (state, action) => {
      state.documentTypesAdminDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
    changeFiles: (state, action) => {
      state.files = action.payload;
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
    [getDocumentTypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      documentTypesAdminAdapter.setAll(state, {data});
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewDocumentTypesAdminDialog,
  closeNewDocumentTypesAdminDialog,
  openEditDocumentTypesAdminDialog,
  closeEditDocumentTypesAdminDialog,
  changeFiles,
  changeParamsDataPageIndex,
  changeParamsDataPageSize,
  changeParamsDataCount,
} = documentTypesAdminSlice.actions;

export default documentTypesAdminSlice.reducer;
