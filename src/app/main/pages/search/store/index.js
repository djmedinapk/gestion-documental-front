import { combineReducers } from "@reduxjs/toolkit";
import files from "./filesSlice";
import documentTypes from "./documentTypesSlice";
import projects from "./projectsSlice";
import searchs from "./searchsSlice";

const reducer = combineReducers({
  files,
  documentTypes,
  projects,
  searchs,
});

export default reducer;
