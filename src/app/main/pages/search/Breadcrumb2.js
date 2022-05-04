import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";
import Input from "@mui/material/Input";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import React, { useEffect, useMemo, useState } from "react";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { selectDocumentTypes } from "./store/documentTypesSlice";
import { selectProjects } from "./store/projectsSlice";
import {
  selectSearchs,
  changeDocumentTypeSearch,
  changeProjectSearch,
  getSearchs,
} from "./store/searchsSlice";

const Breadcrumb2 = ({ className, selected }) => {
  //const arr = selected.location.split('>');
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const documentTypes = useSelector(selectDocumentTypes);
  const projects = useSelector(selectProjects);
  const documentTypeSearch = useSelector(
    ({ fileManagerApp }) => fileManagerApp.searchs.documentTypeSearch
  );
  const projectSearch = useSelector(
    ({ fileManagerApp }) => fileManagerApp.searchs.projectSearch
  );

  const [dataDocumentTypes, setDataDocumentTypes] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);

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
                <em>All Document Types</em>
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
                <em>All Projects</em>
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

export default Breadcrumb2;
