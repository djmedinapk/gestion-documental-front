import Hidden from "@mui/material/Hidden";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setSelectedItem, setSelectedItemId } from "./store/searchsSlice";
import { selectSearchs } from "./store/searchsSlice";
import StyledIcon from "./StyledIcon";

import React, { useEffect, useState } from "react";

const SearchList = (props) => {
  const dispatch = useDispatch();
  const files = useSelector(selectSearchs);
  const selectedItemId = useSelector(
    ({ searchApp }) => searchApp.searchs.selectedItemId
  );

  const [dataFolders, setDataFolders] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);

  useEffect(() => {
    if (files[0]) {
      setDataFolders(files[0].folders);
      setDataFiles(files[0].files);
    }
  }, [files, selectedItemId]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
    >
      <Table className="simple borderless">
        <TableHead>
          <TableRow>
            <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
            <TableCell>Name</TableCell>
            <TableCell className="hidden sm:table-cell">Type</TableCell>
            <TableCell className="hidden sm:table-cell">Owner</TableCell>
            <TableCell className="text-center hidden sm:table-cell">
              Size
            </TableCell>
            <TableCell className="hidden sm:table-cell">Modified</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataFolders.map((item, i) => {
            return (
              <TableRow
                key={i}
                hover
                onClick={(event) => {
                  dispatch(setSelectedItem(item));
                  dispatch(setSelectedItemId(i));
                }}
                selected={i === selectedItemId}
                className="cursor-pointer h-64"
              >
                <TableCell className="max-w-64 w-64 p-0 text-center">
                  <StyledIcon type="folder" />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden sm:table-cell">folder</TableCell>
                <TableCell className="hidden sm:table-cell">{i}</TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  -{item.size === "" ? "-" : item.size}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  -{item.modified}
                </TableCell>
                <Hidden lgUp>
                  <TableCell>
                    <IconButton
                      onClick={(ev) =>
                        props.pageLayout.current.toggleRightSidebar()
                      }
                      aria-label="open right sidebar"
                      size="large"
                    >
                      <Icon>info</Icon>
                    </IconButton>
                  </TableCell>
                </Hidden>
              </TableRow>
            );
          })}
          {dataFiles.map((item, i) => {
            return (
              <TableRow
                key={dataFolders.length + i}
                hover
                onClick={(event) => {
                  dispatch(setSelectedItem(item));
                  dispatch(setSelectedItemId(i + dataFolders.length));
                }}
                selected={dataFolders.length + i === selectedItemId}
                className="cursor-pointer h-64"
              >
                <TableCell className="max-w-64 w-64 p-0 text-center">
                  <StyledIcon type="document" />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden sm:table-cell">file</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {dataFolders.length + i}
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  -{item.size === "" ? "-" : item.size}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  -{item.modified}
                </TableCell>
                <Hidden lgUp>
                  <TableCell>
                    <IconButton
                      onClick={(ev) =>
                        props.pageLayout.current.toggleRightSidebar()
                      }
                      aria-label="open right sidebar"
                      size="large"
                    >
                      <Icon>info</Icon>
                    </IconButton>
                  </TableCell>
                </Hidden>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default SearchList;
