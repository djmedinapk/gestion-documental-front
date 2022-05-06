import { combineReducers } from "@reduxjs/toolkit";
import documentTypes from "./documentTypesSlice";
import projects from "./projectsSlice";
import searchs from "./searchsSlice";

const reducer = combineReducers({
  documentTypes,
  projects,
  searchs,
});

export default reducer;
