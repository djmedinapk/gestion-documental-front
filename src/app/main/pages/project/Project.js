import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/styles";
import i18next from "i18next";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import ProjectHeader from "./ProjectHeader";
import ProjectTable from "./ProjectTable";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up("lg")]: {
      minHeight: 136,
      height: 136,
    },
  },
  "& .FusePageSimple-wrapper": {
    minHeight: 0,
  },
  "& .FusePageSimple-contentWrapper": {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: 24,
      height: "100%",
    },
  },
  "& .FusePageSimple-content": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  "& .FusePageSimple-sidebar": {
    width: 256,
    border: 0,
  },
}));

const Project = () => {
  const { t } = useTranslation("projectPage");
  const pageLayout = useRef(null);

  return (
    <>
      <Root
        header={<ProjectHeader pageLayout={pageLayout} />}
        content={<ProjectTable pageLayout={pageLayout} />}
        leftSidebarContent={<></>}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
};

export default Project;
