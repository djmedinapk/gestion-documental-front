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
      accordionState: "TEK-20221202-adaf",
      addSourceState: { state: "", nameFolder: "" },
      files: [
        {
          name: "DODA",
          statePO: "old",
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
      ],
      folders: [
        {
          name: "Aduanas",
          statePO: "old",
          accordionState: "Aduanas",
          addSourceState: { state: "", nameFolder: "" },
          files: [
            {
              name: "DODA",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Pedimento",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Pedimento Simplificado",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Pedimento Rectificado",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Factura de Importación",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Carta UVA",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            { name: "Folio de UVA" },
            {
              name: "Series",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Packing List",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Hojas de Calculo",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Manifestacion de Valor",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Archivo M con numeros de Pedimento",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
          ],
          folders: [],
        },
        {
          name: "Documentos Origen",
          statePO: "old",
          accordionState: "Documentos Origen",
          addSourceState: { state: "", nameFolder: "" },
          files: [
            {
              name: "Orden de Compra",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Shipping Notice",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: 'Guia Aerea NO Revalidada "rated" (fleteada)',
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Polizas de Seguro",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
          ],
          folders: [],
        },
        {
          name: "UVA",
          statePO: "old",
          accordionState: "UVA",
          addSourceState: { state: "", nameFolder: "" },
          files: [
            {
              name: "Dictamen",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Solicitud de la UVA",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
          ],
          folders: [
            {
              name: "Evidencias",
              statePO: "old",
              accordionState: "Evidencias",
              addSourceState: { state: "", nameFolder: "" },
              files: [],
              folders: [],
            },
          ],
        },
        {
          name: "VUCEM",
          statePO: "old",
          accordionState: "VUCEM",
          addSourceState: { state: "", nameFolder: "" },
          files: [
            {
              name: "COVE",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "ACUSE COVE",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Certificados",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Guia Aerea",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
          ],
          folders: [],
        },
        {
          name: "Comprobables",
          statePO: "old",
          accordionState: "Comprobables",
          addSourceState: { state: "", nameFolder: "" },
          files: [
            {
              name: "Factura Agente Aduanal (.pdf)",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Factura Agente Aduanal (.xml)",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Depositos a Agente Aduanal",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Fletes Pagados",
              statePO: "old",
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
          ],
          folders: [],
        },
        {
          name: "Previo",
          statePO: "old",
          accordionState: "Previo",
          addSourceState: { state: "", nameFolder: "" },
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
