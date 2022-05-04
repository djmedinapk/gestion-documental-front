import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getDocumentTypes = createAsyncThunk(
  "fileManagerApp/documentTypes/getDocumentTypes",
  async (routeParams, { getState }) => {
    const response = await axios.getWithParams("/api/DocumentType");
    const data = await response.data;
    return { data, routeParams };
  }
);

const documentTypesAdminAdapter = createEntityAdapter({});

export const { selectAll: selectDocumentTypes } =
  documentTypesAdminAdapter.getSelectors(
    (state) => state.fileManagerApp.documentTypes
  );

const documentTypesAdminSlice = createSlice({
  name: "fileManagerApp/documentTypes",
  initialState: documentTypesAdminAdapter.getInitialState({
    routeParams: {},
  }),
  reducers: {},
  extraReducers: {
    [getDocumentTypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      documentTypesAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const { changeDocumentTypeSearch, changeProjectSearch } =
  documentTypesAdminSlice.actions;

export default documentTypesAdminSlice.reducer;
