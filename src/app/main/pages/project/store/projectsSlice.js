import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getProjects = createAsyncThunk(
  "projectApp/projects/getProjects",
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().projectApp.projects.routeParams;
    const response = await axios.getWithParams("/api/Project", {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addProjectBoard = createAsyncThunk(
  "projectApp/projects/addProjectBoard",
  async (project, { dispatch, getState }) => {
    const response = await axios.post("/api/Project/addNewProject", project);
    const data = await response.data;
    dispatch(getProjects());
    return data;
  }
);

export const removeProject = createAsyncThunk(
  "projectApp/projects/removeProject",
  async (projectId, { dispatch, getState }) => {
    const { status } = await axios.delete("/api/Project/InCascadeArchived/" + projectId);
    return status;
  }
);

const projectAdapter = createEntityAdapter({});

export const { selectAll: selectProjects } = projectAdapter.getSelectors(
  (state) => state.projectApp.projects
);

const projectSlice = createSlice({
  name: "projectApp/projects",
  initialState: projectAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    dialog: {
      open: false,
    },
    deleteProjectDialog: {
      open: false,
      data: null,
    },
  }),
  reducers: {
    handleDialog: (state, action) => {
      state.dialog = {
        open: !state.dialog.open,
      };
    },
    handleDeleteProjectDialog: (state, action) => {
      state.deleteProjectDialog.open = !state.deleteProjectDialog.open;
    },
  },
  extraReducers: {
    [addProjectBoard.fulfilled]: projectAdapter.addOne,
    [getProjects.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      projectAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const { handleDialog, handleDeleteProjectDialog } = projectSlice.actions;

export default projectSlice.reducer;
