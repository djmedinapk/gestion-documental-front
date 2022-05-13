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
      newPO: { client: { id: 0, name: "" } },
    },
  }),
  reducers: {
   
    changeGeneralParamsNewPOClient: (state, action) => {
      state.generalParams.newPO.client = action.payload;
    },
  },
  extraReducers: {
    
  },
});

export const {
  changeGeneralParamsNewPOClient,
} = globalParamsAdminSlice.actions;

export default globalParamsAdminSlice.reducer;
