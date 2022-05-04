import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getSearchs = createAsyncThunk(
  "fileManagerApp/searchs/getSearchs",
  async (routeParams, { getState }) => {
    const paramsData = {
      Name: getState().fileManagerApp.searchs.textSearch,
      DocumentTypeId: getState().fileManagerApp.searchs.documentTypeSearch,
      ProjectId: getState().fileManagerApp.searchs.projectSearch,
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
  (state) => state.fileManagerApp.searchs
);

const searchsSlice = createSlice({
  name: "fileManagerApp/searchs",
  initialState: searchsAdminAdapter.getInitialState({
    textSearch: "",
    documentTypeSearch: "",
    projectSearch: "",
    selectedItem: null,
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
} = searchsSlice.actions;

export default searchsSlice.reducer;
