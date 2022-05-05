import { combineReducers } from '@reduxjs/toolkit';
import files from './filesAdminSlice';

const reducer = combineReducers({
  files,
});

export default reducer;
