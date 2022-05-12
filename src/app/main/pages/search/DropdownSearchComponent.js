import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { selectDocumentTypes } from "./store/documentTypesSlice";
import { selectProjects } from "./store/projectsSlice";
import {
  changeDocumentTypeSearch,
  changeProjectSearch,
  getSearchs,
} from "./store/searchsSlice";

import { useTranslation } from 'react-i18next';

const DropdownSearchComponent = ({ className, selected }) => {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const documentTypes = useSelector(selectDocumentTypes);
  const projects = useSelector(selectProjects);
  const documentTypeSearch = useSelector(
    ({ searchApp }) => searchApp.searchs.documentTypeSearch
  );
  const projectSearch = useSelector(
    ({ searchApp }) => searchApp.searchs.projectSearch
  );

  const [dataDocumentTypes, setDataDocumentTypes] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);

  const { t } = useTranslation('searchPage');

  useEffect(() => {
    if (documentTypes) {
      setDataDocumentTypes(documentTypes);
    }
    if (projects) {
      setDataProjects(projects);
    }
  }, [documentTypes, projects]);

  function handleDocumentTypeSearchChange(ev) {
    dispatch(changeDocumentTypeSearch(ev.target.value));
    dispatch(getSearchs());
  }

  function handleProjectSearchChange(ev) {
    dispatch(changeProjectSearch(ev.target.value));
    dispatch(getSearchs());
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={className}>
        <div style={{ paddingRight: "5px" }}>
          <FormControl
            style={{ backgroundColor: "white", borderRadius: "4px" }}
            variant="filled"
          >
            <Select
              value={documentTypeSearch}
              onChange={handleDocumentTypeSearchChange}
              displayEmpty
              name="filter"
              classes={{ select: "py-8" }}
            >
              <MenuItem value="">
                <em>{t('ALL_DOCUMENT_TYPES')}</em>
              </MenuItem>
              {dataDocumentTypes.map((row, i) => {
                return (
                  <MenuItem key={row.id} value={row.id}>
                    {row.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div style={{ paddingRight: "5px" }}>
          <FormControl
            style={{ backgroundColor: "white", borderRadius: "4px" }}
            variant="filled"
          >
            <Select
              value={projectSearch}
              onChange={handleProjectSearchChange}
              displayEmpty
              name="filter"
              classes={{ select: "py-8" }}
            >
              <MenuItem value="">
                <em>{t('ALL_PROJECTS')}</em>
              </MenuItem>
              {dataProjects.map((row, i) => {
                return (
                  <MenuItem key={row.id} value={row.id}>
                    {row.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DropdownSearchComponent;
