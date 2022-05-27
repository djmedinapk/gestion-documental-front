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

import { useTranslation } from "react-i18next";
import withRouter from "@fuse/core/withRouter";

const SearchList = (props) => {
  const dispatch = useDispatch();
  const files = useSelector(selectSearchs);
  const selectedItemId = useSelector(
    ({ searchApp }) => searchApp.searchs.selectedItemId
  );

  const [dataFolders, setDataFolders] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);

  const { t } = useTranslation("searchPage");

  useEffect(() => {
    if (files[0]) {
      setDataFolders(files[0].folders);
      setDataFiles(files[0].files);
    }
  }, [files, selectedItemId]);

  const handleClick = (event, item, i) => {
    switch (event.detail) {
      case 1:
        dispatch(setSelectedItem(item));
        dispatch(setSelectedItemId(i));
        break;
      case 2:
        dispatch(setSelectedItem(null));
        if (item.projectId !== 0) {
          props.navigate(`/explorer/project/${item.projectId}`);
        } else if (item.folderId !== 0) {
          props.navigate(`/explorer/folder/${item.id}`);
        }
        break;
      default:
        return;
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
    >
      <Table className="simple borderless">
        <TableHead>
          <TableRow>
            <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
            <TableCell>{t("NAME")}</TableCell>
            <TableCell className="hidden sm:table-cell">{t("TYPE")}</TableCell>
            {/* <TableCell className="hidden sm:table-cell">{t("OWNER")}</TableCell>
            <TableCell className="text-center hidden sm:table-cell">
              {t("SIZE")}
            </TableCell> */}
            <TableCell className="hidden sm:table-cell">
              {t("MODIFIED")}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataFolders.map((item, i) => {
            return (
              <TableRow
                key={i}
                hover
                onClick={(event) => {
                  handleClick(event, item, i);
                }}
                selected={i === selectedItemId}
                className="cursor-pointer h-64"
              >
                <TableCell className="max-w-64 w-64 p-0 text-center">
                  <StyledIcon type="folder" />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {t("FOLDER")}
                </TableCell>
                {/* <TableCell className="hidden sm:table-cell">{i}</TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  -{item.size === "" ? "-" : item.size}
                </TableCell> */}
                <TableCell className="hidden sm:table-cell">
                  {new Date(item.lastUpdated).toDateString()}
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
                  <StyledIcon type={item.documentType.icon} />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {t(item.documentType.icon.toUpperCase())}
                </TableCell>
                {/* <TableCell className="hidden sm:table-cell">
                  {dataFolders.length + i}
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  -{item.size === "" ? "-" : item.size}
                </TableCell> */}
                <TableCell className="hidden sm:table-cell">
                  {new Date(item.lastUpdated).toDateString()}
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

export default withRouter(SearchList);
