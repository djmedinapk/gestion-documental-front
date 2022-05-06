import FuseUtils from "@fuse/utils";
import { Icon, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DocumentTypesAdminTable from "./DocumentTypesAdminTable";
import {
  selectDocumentTypes,
  openEditDocumentTypesAdminDialog,
} from "./store/documentTypesAdminSlice";

const DocumentTypesAdminList = () => {
  const { t } = useTranslation("documentTypeAdminPage");

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const documentTypes = useSelector(selectDocumentTypes);

  useEffect(() => {
    if (documentTypes) {
      setFilteredData(documentTypes);
    }
  }, [documentTypes]);

  const columns = useMemo(
    () => [
      {
        Header: t('NAME'),
        accessor: "name",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: t('DESCRIPTION'),
        accessor: "description",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: t('REGEX'),
        accessor: "regex",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: t('CODE'),
        accessor: "code",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: t('ICON'),
        accessor: "icon",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: t('EXTENSION_ALLOWED'),
        accessor: "extensionAllowed",
        className: "font-medium",
        sortable: false,
      },
      {
        Header: t('LAST_UPDATED'),
        accessor: "lastUpdated",
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
                dispatch(openEditDocumentTypesAdminDialog(row.original));
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
      <DocumentTypesAdminTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditDocumentTypesAdminDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
};

export default DocumentTypesAdminList;
