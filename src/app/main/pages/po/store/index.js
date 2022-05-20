import { combineReducers } from '@reduxjs/toolkit';
import poGeneralTemplate from './poGeneralTemplateSlice';
import productTypes from './productTypesAdminSlice';
import documentTypes from './documentTypesAdminSlice';

const reducer = combineReducers({
  poGeneralTemplate,
  productTypes,
  documentTypes

});

export default reducer;
