import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const getProductTypes = createAsyncThunk(
  "poGeneralTemplateApp/productTypes/getProductTypes",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/ProductType/WithParams", {
      params: getState().poGeneralTemplateApp.productTypes.paramsData,
    });
    const data = await response.data;
    dispatch(changeParamsDataCount(data.count));
    return { data, routeParams };
  }
);

export const addProductType = createAsyncThunk(
  "productTypesApp/productTypes/addProductType",
  async (productType, { dispatch, getState }) => {
    const response = await axios.post("/api/ProductType", productType);
    const data = await response.data;

    dispatch(getProductTypes());

    return data;
  }
);

export const updateProductType = createAsyncThunk(
  "poGeneralTemplateApp/productTypes/updateProductTypes",
  async (productTypeData, { dispatch, getState }) => {
    const response = await axios.put(
      "/api/ProductType/" + productTypeData.id,
      productTypeData
    );
    const data = await response.data;

    dispatch(getProductTypes());

    return data;
  }
);

export const removeProductType = createAsyncThunk(
  "productTypesApp/productTypes/removeProductType",
  async (productTypeId, { dispatch, getState }) => {
    await axios.delete("/api/ProductType/" + productTypeId);

    dispatch(getProductTypes());

    return productTypeId;
  }
);

const productTypesAdminAdapter = createEntityAdapter({});

export const { selectAll: selectProductTypes } =
  productTypesAdminAdapter.getSelectors(
    (state) => state.poGeneralTemplateApp.productTypes
  );

const productTypesAdminSlice = createSlice({
  name: "poGeneralTemplateApp/productTypes",
  initialState: productTypesAdminAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    paramsData: {
      PageIndex: 1,
      PageSize: 10,
      Count: 0,
    },
    productTypesAdminDialog: {
      type: "new",
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
    changeParamsDataPageIndex: (state, action) => {
      state.paramsData.PageIndex = action.payload;
    },
    changeParamsDataPageSize: (state, action) => {
      state.paramsData.PageSize = action.payload;
    },
    changeParamsDataCount: (state, action) => {
      state.paramsData.Count = action.payload;
    },
  },
  extraReducers: {
    [getProductTypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      productTypesAdminAdapter.setAll(state, { data });
      state.routeParams = routeParams;
    },
  },
});

export const {
  openNewProductTypesAdminDialog,
  closeNewProductTypesAdminDialog,
  openEditProductTypesAdminDialog,
  closeEditProductTypesAdminDialog,
  changeParamsDataPageIndex,
  changeParamsDataPageSize,
  changeParamsDataCount,
} = productTypesAdminSlice.actions;

export default productTypesAdminSlice.reducer;
