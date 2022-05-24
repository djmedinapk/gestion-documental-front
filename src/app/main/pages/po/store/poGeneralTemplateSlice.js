import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";
import { dataPO } from "./Params";

export const fileUp = createAsyncThunk(
  "poGeneralTemplateApp/poGeneralTemplateData/fileUp",
  async (dataPO, { dispatch, getState }) => {
    const response = await axios.post("/api/File/uploadfiles", dataPO);
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

export const folderCreateSystemUp = createAsyncThunk(
  "poGeneralTemplateApp/poGeneralTemplateData/folderCreateSystemUp",
  async (route, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/Folder/CreateFolderSystem", {
      params: route,
    });
    const data = await response.data;
    return data;
  }
);

export const getFoldersValidateUp = createAsyncThunk(
  "poGeneralTemplateApp/foldersValidateUp/getFoldersValidateUp",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/Folder/WithParams", {
      params: routeParams,
    });
    const data = await response.data;
    return { data, routeParams };
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
    datosPOs: dataPO,
    
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
