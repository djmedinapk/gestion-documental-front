import { combineReducers } from '@reduxjs/toolkit';
import explorer from './explorerSlice';
import folder from './folderSlice';

const reducer = combineReducers({
    explorer,
    folder,
});

export default reducer;
