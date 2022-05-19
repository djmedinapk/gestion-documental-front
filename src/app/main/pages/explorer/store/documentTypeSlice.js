import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getDocumentTypes = createAsyncThunk(
  "documentTypeApp/documentTypes/getDocumentTypes",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.get("/api/DocumentType");
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


const documentTypeAdapter = createEntityAdapter({});

export const { selectAll: selectDocumentTypes } =
  documentTypeAdapter.getSelectors(
    (state) => state.explorerApp.documentType
  );

const documentTypesSlice = createSlice({
  name: "documentTypeApp/documentType",
  initialState: documentTypeAdapter.getInitialState({
    searchText: "",
    routeParams: {},    
  }),
  reducers: {},
  extraReducers: {
    [getDocumentTypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      documentTypeAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export default documentTypesSlice.reducer;
