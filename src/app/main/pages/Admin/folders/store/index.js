import { combineReducers } from '@reduxjs/toolkit';
import folders from './foldersAdminSlice';

const reducer = combineReducers({
  folders,
});

export default reducer;
