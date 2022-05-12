import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getProjects = createAsyncThunk(
  "searchApp/projects/getProjects",
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().searchApp.projects.routeParams;
    const response = await axios.getWithParams("/api/Project");
    const data = await response.data;

    return { data, routeParams };
  }
);

const projectsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectProjects } = projectsAdminAdapter.getSelectors(
  (state) => state.searchApp.projects
);

const contactsSlice = createSlice({
  name: "searchApp/projects",
  initialState: projectsAdminAdapter.getInitialState({
    routeParams: {},
  }),
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      projectsAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export default contactsSlice.reducer;
