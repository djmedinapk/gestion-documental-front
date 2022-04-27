import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from './../../../../../services/Axios/HttpClient';

export const getProjects = createAsyncThunk(
  'projectsAdminApp/projects/getProjects',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().projectsAdminApp.projects.routeParams;
    const response = await axios.getWithParams('/api/Project', {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

const projectsAdminAdapter = createEntityAdapter({});

export const { selectAll: selectProjects } =  projectsAdminAdapter.getSelectors((state) => state.projectsAdminApp.projects);

  
const contactsSlice = createSlice({
  name: 'projectsAdminApp/projects',
  initialState: projectsAdminAdapter.getInitialState({
    searchText: '',
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