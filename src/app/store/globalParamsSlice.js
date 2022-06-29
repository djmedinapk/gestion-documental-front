import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../services/Axios/HttpClient";

const globalParamsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectglobalParams } =
  globalParamsAdminAdapter.getSelectors(
    (state) => state.globalParamsApp.globalParams
  );

const globalParamsAdminSlice = createSlice({
  name: "globalParamsApp/globalParams",
  initialState: globalParamsAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    generalParams: {
      currentFolderExplorer: { id: 0, name: "" },
      newPO: { client: { id: 0, name: "" } },
      editPO: { id: 0, name: "" },
    },
  }),
  reducers: {
    changeGeneralParamsCurrentFolderExplorer: (state, action) => {
      state.generalParams.currentFolderExplorer = action.payload;
    },
    changeGeneralParamsNewPOClient: (state, action) => {
      state.generalParams.newPO.client = action.payload;
    },
    changeGeneralParamsEditPO: (state, action) => {
      state.generalParams.editPO = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeGeneralParamsCurrentFolderExplorer,
  changeGeneralParamsNewPOClient,
  changeGeneralParamsEditPO,
} = globalParamsAdminSlice.actions;

export default globalParamsAdminSlice.reducer;
