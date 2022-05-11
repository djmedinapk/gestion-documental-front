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
      statePO: "old",
      files: [],
      folders: [
        {
          name: "Aduanas",
          statePO: "old",
          files: [
            { name: "DODA", statePO: "old" },
            { name: "Pedimento", statePO: "old" },
            { name: "Pedimento Simplificado", statePO: "old" },
            { name: "Pedimento Rectificado", statePO: "old" },
            { name: "Factura de Importación", statePO: "old" },
            { name: "Carta UVA", statePO: "old" },
            { name: "Folio de UVA" },
            { name: "Series", statePO: "old" },
            { name: "Packing List", statePO: "old" },
            { name: "Hojas de Calculo", statePO: "old" },
            { name: "Manifestacion de Valor", statePO: "old" },
            { name: "Archivo M con numeros de Pedimento", statePO: "old" },
          ],
          folders: [],
        },
        {
          name: "Documentos Origen",
          statePO: "old",
          files: [
            { name: "Orden de Compra", statePO: "old" },
            { name: "Shipping Notice", statePO: "old" },
            {
              name: 'Guia Aerea NO Revalidada "rated" (fleteada)',
              statePO: "old",
            },
            { name: "Polizas de Seguro", statePO: "old" },
          ],
          folders: [],
        },
        {
          name: "UVA",
          statePO: "old",
          files: [
            { name: "Dictamen", statePO: "old" },
            { name: "Solicitud de la UVA", statePO: "old" },
          ],
          folders: [
            {
              name: "Evidencias",
              statePO: "old",
              files: [],
              folders: [],
            },
          ],
        },
        {
          name: "VUCEM",
          statePO: "old",
          files: [
            { name: "COVE", statePO: "old" },
            { name: "ACUSE COVE", statePO: "old" },
            { name: "Certificados", statePO: "old" },
            { name: "Guia Aerea", statePO: "old" },
          ],
          folders: [],
        },
        {
          name: "Comprobables",
          statePO: "old",
          files: [
            { name: "Factura Agente Aduanal (.pdf)", statePO: "old" },
            { name: "Factura Agente Aduanal (.xml)", statePO: "old" },
            { name: "Depositos a Agente Aduanal", statePO: "old" },
            { name: "Fletes Pagados", statePO: "old" },
          ],
          folders: [],
        },
        {
          name: "Previo",
          statePO: "old",
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
