import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "./../../../../services/Axios/HttpClient";
import { dataPO } from "./Params";

export const fileUp = createAsyncThunk(
  "poEditGeneralTemplateApp/poEditGeneralTemplateData/fileUp",
  async (dataPO, { dispatch, getState }) => {
    const response = await axios.post("/api/File/uploadfile", dataPO);
    const data = await response.data;
    return data;
  }
);

export const folderUp = createAsyncThunk(
  "poEditGeneralTemplateApp/poEditGeneralTemplateData/folderUp",
  async (folder, { dispatch, getState }) => {
    const response = await axios.post("api/Folder", folder);
    const data = await response.data;
    return data;
  }
);

export const folderCreateSystemUp = createAsyncThunk(
  "poEditGeneralTemplateApp/poEditGeneralTemplateData/folderCreateSystemUp",
  async (route, { dispatch, getState }) => {
    const response = await axios.getWithParams(
      "/api/Folder/CreateFolderSystem",
      {
        params: route,
      }
    );
    const data = await response.data;
    return data;
  }
);

export const getFoldersValidateUp = createAsyncThunk(
  "poEditGeneralTemplateApp/foldersValidateUp/getFoldersValidateUp",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/Folder/WithParams", {
      params: routeParams,
    });
    const data = await response.data;
    return { data, routeParams };
  }
);

export const getPOById = createAsyncThunk(
  "poEditGeneralTemplateApp/foldersPO/getPOById",
  async (routeParams, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/Search/SearchPO", {
      params: routeParams,
    });
    const data = await response.data;
    return { data, routeParams };
  }
);

export const prueba = createAsyncThunk(
  "poEditGeneralTemplateApp/prueba/prueba",
  async (data, { dispatch, getState }) => {

    dispatch(changeDatosPOs(data));

    return { data };
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

const poEditGeneralTemplateAdapter = createEntityAdapter({});

// export const { selectAll: selectDataEditPO } =
//   poEditGeneralTemplateAdapter.getSelectors(
//     (state) => state.poEditGeneralTemplateApp.perwter
//   );

export const { selectAll: selectProducts, selectById: selectProductById } =
  poEditGeneralTemplateAdapter.getSelectors(
    (state) => state.poEditGeneralTemplateApp.poEditGeneralTemplateData
  );

const poEditGeneralTemplateSlice = createSlice({
  name: "poEditGeneralTemplateApp/poEditGeneralTemplateData",
  initialState: poEditGeneralTemplateAdapter.getInitialState({
    searchText: "",
    datosPOs: dataPO,
  }),
  reducers: {
    changeDatosPOs: (state, action) => {
      state.datosPOs = action.payload;
    },
  },
  extraReducers: {
    // [getPOById.fulfilled]: (state, action) => {
    //   const { data, routeParams } = action.payload;
    //   poEditGeneralTemplateAdapter.setAll(state, { data });
    //   state.routeParams = routeParams;
    // },
  },
});

export const { setProductsSearchText, changeDatosPOs } =
  poEditGeneralTemplateSlice.actions;

export default poEditGeneralTemplateSlice.reducer;
