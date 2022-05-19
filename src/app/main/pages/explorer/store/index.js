import { combineReducers } from '@reduxjs/toolkit';
import explorer from './explorerSlice';
import folder from './folderSlice';
import documentType from './documentTypeSlice';
import file from './fileSlice';

const reducer = combineReducers({
    explorer,
    folder,
    documentType,
    file,
});

export default reducer;
