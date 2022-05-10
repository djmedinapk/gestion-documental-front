import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "eCommerceApp/products/getProducts",
  async () => {
    const response = await axios.get("/api/e-commerce-app/products");
    const data = await response.data;

    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/products/removeProducts",
  async (productIds, { dispatch, getState }) => {
    await axios.post("/api/e-commerce-app/remove-products", { productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: "eCommerceApp/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
    datosPOs: {
      name: "TEK-20221202-adaf",
      files: [],
      folders: [
        {
          name: "Aduanas",
          files: [
            { name: "DODA" },
            { name: "Pedimento" },
            { name: "Pedimento Simplificado" },
            { name: "Pedimento Rectificado" },
            { name: "Factura de Importación" },
            { name: "Carta UVA" },
            { name: "Folio de UVA" },
            { name: "Series" },
            { name: "Packing List" },
            { name: "Hojas de Calculo" },
            { name: "Manifestacion de Valor" },
            { name: "Archivo M con numeros de Pedimento" },
          ],
          folders: [],
        },
        {
          name: "Documentos Origen",
          files: [
            { name: "Orden de Compra" },
            { name: "Shipping Notice" },
            { name: 'Guia Aerea NO Revalidada "rated" (fleteada)' },
            { name: "Polizas de Seguro" },
          ],
          folders: [],
        },
        {
          name: "UVA",
          files: [{ name: "Dictamen" }, { name: "Solicitud de la UVA" }],
          folders: [
            {
              name: "Evidencias",
              files: [],
              folders: [],
            },
          ],
        },
        {
          name: "VUCEM",
          files: [
            { name: "COVE" },
            { name: "ACUSE COVE" },
            { name: "Certificados" },
            { name: "Guia Aerea" },
          ],
          folders: [],
        },
        {
          name: "Comprobables",
          files: [
            { name: "Factura Agente Aduanal (.pdf)" },
            { name: "Factura Agente Aduanal (.xml)" },
            { name: "Depositos a Agente Aduanal" },
            { name: "Fletes Pagados" },
          ],
          folders: [],
        },
        {
          name: "Previo",
          files: [],
          folders: [],
        },
      ],
    },
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    changeDatosPOs: (state, action) => {
      state.datosPOs = action.payload;
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText, changeDatosPOs } = productsSlice.actions;

export default productsSlice.reducer;
