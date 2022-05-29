import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getProjects = createAsyncThunk(
  "projectsAdminApp/projects/getProjects",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/Project/WithParams", {
      params: getState().projectsAdminApp.projects.paramsData,
    });
    const data = await response.data;
    dispatch(changeParamsDataCount(data.count));
    return { data, routeParams };
  }
);

export const addProject = createAsyncThunk(
  "projectsApp/projects/addProject",
  async (project, { dispatch, getState }) => {
    const response = await axios.post("/api/Project", project);
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

export const updateProject = createAsyncThunk(
  "projectsAdminApp/projects/updateProjects",
  async (projectData, { dispatch, getState }) => {
    const response = await axios.put(
      "/api/Project/" + projectData.id,
      projectData
    );
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

export const removeProject = createAsyncThunk(
  "projectsApp/projects/removeProject",
  async (projectId, { dispatch, getState }) => {
    await axios.delete("/api/Project/" + projectId);

    dispatch(getProjects());

    return projectId;
  }
);

const projectsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectProjects } =
  projectsAdminAdapter.getSelectors(
    (state) => state.projectsAdminApp.projects
  );

const projectsAdminSlice = createSlice({
  name: "projectsAdminApp/projects",
  initialState: projectsAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    paramsData: {
      PageIndex: 1,
      PageSize: 10,
      Count: 0,
    },
    projectsAdminDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewProjectsAdminDialog: (state, action) => {
      state.projectsAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },

    openNewProjectsAdminDialog: (state, action) => {
      state.projectsAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewProjectsAdminDialog: (state, action) => {
      state.projectsAdminDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditProjectsAdminDialog: (state, action) => {
      state.projectsAdminDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditProjectsAdminDialog: (state, action) => {
      state.projectsAdminDialog = {
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
    [getProjects.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      projectsAdminAdapter.setAll(state, { data });
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewProjectsAdminDialog,
  closeNewProjectsAdminDialog,
  openEditProjectsAdminDialog,
  closeEditProjectsAdminDialog,
  changeParamsDataPageIndex,
  changeParamsDataPageSize,
  changeParamsDataCount,
} = projectsAdminSlice.actions;

export default projectsAdminSlice.reducer;
