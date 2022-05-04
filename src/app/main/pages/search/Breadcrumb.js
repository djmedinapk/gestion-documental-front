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
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { motion } from "framer-motion";

import {
  selectSearchs,
  changeTextSearch,
  getSearchs,
} from "./store/searchsSlice";

function Breadcrumb({ className, selected }) {
  //const arr = selected.location.split('>');
  const mainTheme = useSelector(selectMainTheme);

  const dispatch = useDispatch();
  const textSearch = useSelector(
    ({ fileManagerApp }) => fileManagerApp.searchs.textSearch
  );

  function handleTextSearchChange(ev) {
    dispatch(changeTextSearch(ev.target.value));
    dispatch(getSearchs());
  }

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Typography component={"span"} className={className}>
          <motion.div className="flex flex-1" style={{ paddingRight: "75px" }}>
            <Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 shadow">
              <Icon color="action">search</Icon>

              <Input
                placeholder="Search"
                className="px-16"
                disableUnderline
                fullWidth
                value={textSearch}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={handleTextSearchChange}
              />
            </Paper>
          </motion.div>
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default Breadcrumb;
