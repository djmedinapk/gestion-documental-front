import FuseUtils from "@fuse/utils";
import { Icon, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FoldersAdminTable from "./FoldersAdminTable";
import {
  selectFolders,
  openEditFoldersAdminDialog,
} from "./store/foldersAdminSlice";

const FoldersAdminList = () => {
  const { t } = useTranslation("folderAdminPage");

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const folders = useSelector(selectFolders);

  useEffect(() => {
    
    if (folders[0]) {
      setFilteredData(folders[0].data);
    }
  }, [folders]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: "Description",
        accessor: "description",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: "Is PO",
        accessor: "isPO",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: "Project Id",
        accessor: "projectId",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: "Folder Id",
        accessor: "folderId",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: "Product Type Id",
        accessor: "productType.id",
        className: "font-medium",
        sortable: false,
      },
      {
        id: "action",
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={(ev) => {
                dispatch(openEditFoldersAdminDialog(row.original));
              }}
              size="large"
            >
              <Icon>edit</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          {t("NO_DATA_TO_SHOW")}
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <FoldersAdminTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditFoldersAdminDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
};

export default FoldersAdminList;
