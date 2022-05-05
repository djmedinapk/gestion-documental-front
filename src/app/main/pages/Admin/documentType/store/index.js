import { combineReducers } from '@reduxjs/toolkit';
import documentTypes from './documentTypesAdminSlice';

const reducer = combineReducers({
  documentTypes,
});

export default reducer;
