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

export const downloadFile = createAsyncThunk(
  "fileApp/file/downloadFile",
  async (file, { dispatch, getState }) => {
    const response = await axios.getWithParams("/api/File/fileDownload", {
      params: file,
    });

    var type = response.data.documentType.extensionAllowed;
    var name = response.data.name.split(".");

    switch (type) {
      case ".pdf":
        type = "application/pdf";
        break;
      case ".xlsx,.xls":
        type =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      case "image/*":
        type = "image/" + name[name.length - 1];
        break;
      default:
        type = type;
        break;
    }

    const blob = b64toBlob(response.data.file, type);
    const blobUrl = URL.createObjectURL(blob);

    const { data, status } = await response;
    data.name = response.data.name;
    data.urlFile = blobUrl;
    return { data, status };
  }
);

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

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
