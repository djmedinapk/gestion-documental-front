import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getProjects = createAsyncThunk(
  "fileManagerApp/projects/getProjects",
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().fileManagerApp.projects.routeParams;
    const response = await axios.getWithParams("/api/Project");
    const data = await response.data;

    return { data, routeParams };
  }
);

const projectsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectProjects } = projectsAdminAdapter.getSelectors(
  (state) => state.fileManagerApp.projects
);

const contactsSlice = createSlice({
  name: "fileManagerApp/projects",
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
