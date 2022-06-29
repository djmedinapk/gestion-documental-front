import { combineReducers } from '@reduxjs/toolkit';
import poGeneralTemplate from './poGeneralTemplateSlice';
import poEditGeneralTemplate from './poEditGeneralTemplateSlice';
import productTypes from './productTypesAdminSlice';
import documentTypes from './documentTypesAdminSlice';

const reducer = combineReducers({
  poGeneralTemplate,
  poEditGeneralTemplate,
  productTypes,
  documentTypes

});

export default reducer;
