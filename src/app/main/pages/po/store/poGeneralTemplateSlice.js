import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";

export const fileUp = createAsyncThunk(
  "poGeneralTemplateApp/poGeneralTemplateData/fileUp",
  async (dataPO, { dispatch, getState }) => {
    const formData = new FormData();
    const dataPe = JSON.stringify(dataPO.data);
    var filesToBack = extractFiles(
      dataPO.files,
      dataPO.files.name,
      dataPO.files.name + "/"
    );
    console.log(filesToBack);
    var fr = new File(filesToBack[1]);
    /*for (var i = 0; i < filesToBack.length; i++) {
      formData.append(i + "", new File(filesToBack[i]));
    }*/
    console.log(fr);
    formData.append("dataJson", dataPe);
    const response = await axios.post("/api/DocumentType/file", formData);
    const data = await response.data;
    return data;
  }
);

export const folderUp = createAsyncThunk(
  "poGeneralTemplateApp/poGeneralTemplateData/folderUp",
  async (folder, { dispatch, getState }) => {
    const response = await axios.post("api/Folder", folder);
    const data = await response.data;
    return data;
  }
);

const extractFiles = (data, mainFolder, route) => {
  var arrayFiles = [];

  data.files.forEach((element) => {
    arrayFiles.push(element.contentFile);
  });

  if (data.folders.length !== 0) {
    data.folders.forEach((element) => {
      var arrayFilesInside = extractFiles(
        element,
        mainFolder,
        route + element.name + "/"
      );
      arrayFiles = arrayFiles.concat(arrayFilesInside);
    });
  }

  if (route === mainFolder + "/UVA/Evidencias/") {
    data.products.forEach((element) => {
      element.files.forEach((element2) => {
        arrayFiles.push(element2);
      });
    });
  }

  return arrayFiles;
};

const poGeneralTemplateAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  poGeneralTemplateAdapter.getSelectors(
    (state) => state.poGeneralTemplateApp.poGeneralTemplateData
  );

const poGeneralTemplateSlice = createSlice({
  name: "poGeneralTemplateApp/poGeneralTemplateData",
  initialState: poGeneralTemplateAdapter.getInitialState({
    searchText: "",
    datosPOs: {
      name: "",
      pediment: "",
      year: "",
      month: "",
      productType: "",
      client: { id: 0, name: "" },
      statePO: "old",
      accordionState: "",
      addSourceState: { state: "", nameFolder: "" },
      files: [],
      folders: [
       
        {
          name: "UVA",
          statePO: "old",
          accordionState: "UVA",
          addSourceState: { state: "", nameFolder: "" },
          files: [
            {
              name: "Dictamen",
              statePO: "old",
              documentType: {
                id: 3,
                name: "Pedimento",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: ".pdf",
                lastUpdated: "",
              },
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
              documentType: {
                id: 3,
                name: "Pedimento",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: ".pdf",
                lastUpdated: "",
              },
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
              products: [],
              files: [],
              folders: [],
            },
          ],
        },
      ],
    },
    /*datosPOs: {
      name: "",
      pediment: "",
      year: "",
      month: "",
      productType: "",
      client: { id: 0, name: "" },
      statePO: "old",
      accordionState: "",
      addSourceState: { state: "", nameFolder: "" },
      files: [],
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Folio de UVA",
              statePO: "old",
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
              contentFile: {
                name: "",
                lastModified: 0,
                lastModifiedDate: null,
                size: 0,
                type: "",
              },
            },
            {
              name: "Series",
              statePO: "old",
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              products: [],
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
              documentType: {
                id: 0,
                name: "",
                description: "",
                regex: "",
                code: "",
                icon: "",
                extensionAllowed: "",
                lastUpdated: "",
              },
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
    },*/
  }),
  reducers: {
    changeDatosPOs: (state, action) => {
      state.datosPOs = action.payload;
    },
  },
  extraReducers: {},
});

export const { setProductsSearchText, changeDatosPOs } =
  poGeneralTemplateSlice.actions;

export default poGeneralTemplateSlice.reducer;
