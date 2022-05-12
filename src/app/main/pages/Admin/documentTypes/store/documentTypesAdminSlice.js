import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getDocumentTypes = createAsyncThunk(
  "documentTypesAdminApp/documentTypes/getDocumentTypes",
  async (routeParams, { getState }) => {
    routeParams =
      routeParams || getState().documentTypesAdminApp.documentTypes.routeParams;
    const response = await axios.getWithParams("/api/DocumentType", {
      params: routeParams,
    });
    const data = await response.data;

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
  "documentTypesAdminApp/documentTypes/updateDocumentTypes",
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
    (state) => state.documentTypesAdminApp.documentTypes
  );

const documentTypesAdminSlice = createSlice({
  name: "documentTypesAdminApp/documentTypes",
  initialState: documentTypesAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
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
  },
  extraReducers: {
    [getDocumentTypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      documentTypesAdminAdapter.setAll(state, data);
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
} = documentTypesAdminSlice.actions;

export default documentTypesAdminSlice.reducer;
