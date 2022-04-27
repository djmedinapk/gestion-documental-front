import FuseUtils from "@fuse/utils";
import { Icon, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProjectsAdminTable from "./ProjectsAdminTable";
import { selectProjects } from "./store/projectsSlice";
import  CRUDTable  from './../../../../Components/CrudTable/CRUDTable';

const ProjectsAdminList = () => {
  const { t } = useTranslation("projectAdminPage");

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    if (projects) {
      setFilteredData(projects);
    }
  }, [projects]);

  const columns = useMemo(
    () => [      
      {
        Header: 'Name',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'font-medium',
        sortable: false,
      },
      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">            
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              size="large"
            >
              <Icon>delete</Icon>
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
      <CRUDTable
      columns={columns}
      data={filteredData}
      onRowClick={(ev, row) => {
        if (row) {
         
        }
      }}
       />
    </motion.div>
  );
};

export default ProjectsAdminList;
