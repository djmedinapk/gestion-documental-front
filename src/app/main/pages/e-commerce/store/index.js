import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import products from './productsSlice';
import productTypes from './productTypesAdminSlice';
import documentTypes from './documentTypesAdminSlice';

const reducer = combineReducers({
  products,
  product,
  orders,
  order,
  productTypes,
  documentTypes

});

export default reducer;
