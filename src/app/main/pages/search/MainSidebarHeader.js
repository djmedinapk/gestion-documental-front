import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

function MainSidebarHeader() {
  return (
    <div className="flex flex-1">
      <Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 shadow">
        <Icon color="action">search</Icon>

        <Input
          placeholder="Search"
          className="px-16"
          disableUnderline
          fullWidth
          // value={searchText}
          inputProps={{
            "aria-label": "Search",
          }}
          // onChange={(ev) => dispatch(setTodosSearchText(ev))}
        />
      </Paper>
    </div>
  );
}

export default MainSidebarHeader;
