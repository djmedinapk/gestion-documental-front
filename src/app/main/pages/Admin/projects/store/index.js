import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsAdminSlice';

const reducer = combineReducers({
  projects,
});

export default reducer;
