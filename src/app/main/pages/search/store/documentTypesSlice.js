import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getDocumentTypes = createAsyncThunk(
  "searchApp/documentTypes/getDocumentTypes",
  async (routeParams, { getState }) => {
    const response = await axios.getWithParams("/api/DocumentType");
    const data = await response.data;
    return { data, routeParams };
  }
);

const documentTypesAdminAdapter = createEntityAdapter({});

export const { selectAll: selectDocumentTypes } =
  documentTypesAdminAdapter.getSelectors(
    (state) => state.searchApp.documentTypes
  );

const documentTypesAdminSlice = createSlice({
  name: "searchApp/documentTypes",
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
