import { combineReducers } from '@reduxjs/toolkit';
import productTypes from './productTypesAdminSlice';

const reducer = combineReducers({
  productTypes,
});

export default reducer;
