import { combineReducers } from '@reduxjs/toolkit';
import versions from './versionsAdminSlice';

const reducer = combineReducers({
  versions,
});

export default reducer;
