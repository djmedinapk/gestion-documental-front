import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import Input from "@mui/material/Input";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { motion } from "framer-motion";

import { changeTextSearch, getSearchs } from "./store/searchsSlice";

function TextSearchComponent({ className, selected }) {
  const mainTheme = useSelector(selectMainTheme);

  const dispatch = useDispatch();
  const textSearch = useSelector(
    ({ searchApp }) => searchApp.searchs.textSearch
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

export default TextSearchComponent;
