import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getSearchs = createAsyncThunk(
  "searchApp/searchs/getSearchs",
  async (routeParams, { getState }) => {
    const paramsData = {
      Name: getState().searchApp.searchs.textSearch,
      DocumentTypeId: getState().searchApp.searchs.documentTypeSearch,
      ProjectId: getState().searchApp.searchs.projectSearch,
    };
    const response = await axios.getWithParams("/api/Search", {
      params: paramsData,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

const searchsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectSearchs } = searchsAdminAdapter.getSelectors(
  (state) => state.searchApp.searchs
);

const searchsSlice = createSlice({
  name: "searchApp/searchs",
  initialState: searchsAdminAdapter.getInitialState({
    textSearch: "",
    documentTypeSearch: "",
    projectSearch: "",
    selectedItem: null,
    selectedItemId: "",
    routeParams: {},
  }),
  reducers: {
    changeTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
    changeDocumentTypeSearch: (state, action) => {
      state.documentTypeSearch = action.payload;
    },
    changeProjectSearch: (state, action) => {
      state.projectSearch = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload;
    },
  },
  extraReducers: {
    [getSearchs.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      searchsAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const {
  changeTextSearch,
  changeDocumentTypeSearch,
  changeProjectSearch,
  setSelectedItem,
  setSelectedItemId,
} = searchsSlice.actions;

export default searchsSlice.reducer;
