import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getVersions = createAsyncThunk(
  "versionsAdminApp/versions/getVersions",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/Version/WithParams", {
      params: getState().versionsAdminApp.versions.paramsData,
    });
    const data = await response.data;
    dispatch(changeParamsDataCount(data.count));
    return { data, routeParams };
  }
);

export const addVersion = createAsyncThunk(
  "versionsApp/versions/addVersion",
  async (version, { dispatch, getState }) => {
    const response = await axios.post("/api/Version", version);
    const data = await response.data;

    dispatch(getVersions());

    return data;
  }
);

export const updateVersion = createAsyncThunk(
  "versionsAdminApp/versions/updateVersions",
  async (versionData, { dispatch, getState }) => {
    const response = await axios.put(
      "/api/Version/" + versionData.id,
      versionData
    );
    const data = await response.data;

    dispatch(getVersions());

    return data;
  }
);

export const removeVersion = createAsyncThunk(
  "versionsApp/versions/removeVersion",
  async (versionId, { dispatch, getState }) => {
    await axios.delete("/api/Version/" + versionId);

    dispatch(getVersions());

    return versionId;
  }
);

const versionsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectVersions } =
  versionsAdminAdapter.getSelectors(
    (state) => state.versionsAdminApp.versions
  );

const versionsAdminSlice = createSlice({
  name: "versionsAdminApp/versions",
  initialState: versionsAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    paramsData: {
      PageIndex: 1,
      PageSize: 10,
      Count: 0,
    },
    versionsAdminDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewVersionsAdminDialog: (state, action) => {
      state.versionsAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },

    openNewVersionsAdminDialog: (state, action) => {
      state.versionsAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewVersionsAdminDialog: (state, action) => {
      state.versionsAdminDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditVersionsAdminDialog: (state, action) => {
      state.versionsAdminDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditVersionsAdminDialog: (state, action) => {
      state.versionsAdminDialog = {
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
    [getVersions.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      versionsAdminAdapter.setAll(state, { data });
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewVersionsAdminDialog,
  closeNewVersionsAdminDialog,
  openEditVersionsAdminDialog,
  closeEditVersionsAdminDialog,
  changeParamsDataPageIndex,
  changeParamsDataPageSize,
  changeParamsDataCount,
} = versionsAdminSlice.actions;

export default versionsAdminSlice.reducer;
