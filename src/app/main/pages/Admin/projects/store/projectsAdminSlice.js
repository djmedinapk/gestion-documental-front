import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getProjects = createAsyncThunk(
  "projectsAdminApp/projects/getProjects",
  async (routeParams, { getState }) => {
    routeParams =
      routeParams || getState().projectsAdminApp.projects.routeParams;
    const response = await axios.getWithParams("/api/Project", {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addProject = createAsyncThunk(
  'projectsApp/projects/addProject',
  async (project, { dispatch, getState }) => {
    const response = await axios.post('/api/Project', project );
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

export const updateProject = createAsyncThunk(
  'projectsAdminApp/projects/updateProjects',
  async (projectData, { dispatch, getState }) => {
    const response = await axios.put('/api/Project/'+projectData.id, projectData);
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

export const removeProject = createAsyncThunk(
  'projectsApp/projects/removeProject',
  async (projectId, { dispatch, getState }) => {
    await axios.delete('/api/Project/'+projectId);

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
    projectsAdminDialog: {
      type: 'new',
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
  },
  extraReducers: {
    [getProjects.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      projectsAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewProjectsAdminDialog,
  closeNewProjectsAdminDialog,
  openEditProjectsAdminDialog,
  closeEditProjectsAdminDialog,
} = projectsAdminSlice.actions;

export default projectsAdminSlice.reducer;
