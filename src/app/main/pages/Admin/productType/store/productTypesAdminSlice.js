import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../../services/Axios/HttpClient";

export const getProductTypes = createAsyncThunk(
  "productTypesAdminApp/productTypes/getProductTypes",
  async (routeParams, { getState }) => {
    routeParams =
      routeParams || getState().productTypesAdminApp.productTypes.routeParams;
    const response = await axios.getWithParams("/api/ProductType", {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addProductType = createAsyncThunk(
  'productTypesApp/productTypes/addProductType',
  async (productType, { dispatch, getState }) => {
    const response = await axios.post('/api/ProductType', productType );
    const data = await response.data;

    dispatch(getProductTypes());

    return data;
  }
);

export const updateProductType = createAsyncThunk(
  'productTypesAdminApp/productTypes/updateProductTypes',
  async (productTypeData, { dispatch, getState }) => {
    const response = await axios.put('/api/ProductType/'+productTypeData.id, productTypeData);
    const data = await response.data;

    dispatch(getProductTypes());

    return data;
  }
);

export const removeProductType = createAsyncThunk(
  'productTypesApp/productTypes/removeProductType',
  async (productTypeId, { dispatch, getState }) => {
    await axios.delete('/api/ProductType/'+productTypeId);

    dispatch(getProductTypes());

    return productTypeId;
  }
);

const productTypesAdminAdapter = createEntityAdapter({});

export const { selectAll: selectProductTypes } =
  productTypesAdminAdapter.getSelectors(
    (state) => state.productTypesAdminApp.productTypes
  );

const productTypesAdminSlice = createSlice({
  name: "productTypesAdminApp/productTypes",
  initialState: productTypesAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    productTypesAdminDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewProductTypesAdminDialog: (state, action) => {
      state.productTypesAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },

    openNewProductTypesAdminDialog: (state, action) => {
      state.productTypesAdminDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewProductTypesAdminDialog: (state, action) => {
      state.productTypesAdminDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditProductTypesAdminDialog: (state, action) => {
      state.productTypesAdminDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditProductTypesAdminDialog: (state, action) => {
      state.productTypesAdminDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getProductTypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      productTypesAdminAdapter.setAll(state, data);
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewProductTypesAdminDialog,
  closeNewProductTypesAdminDialog,
  openEditProductTypesAdminDialog,
  closeEditProductTypesAdminDialog,
} = productTypesAdminSlice.actions;

export default productTypesAdminSlice.reducer;
