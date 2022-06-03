import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import StyledIcon from "./StyledIcon";

import React, { useEffect, useState } from "react";

import { Icon } from "@mui/material";

import { useTranslation } from "react-i18next";

const RightSideBarContent = () => {
  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const { t } = useTranslation("searchPage");

  if (!selectedItem) {
    return null;
  }

  if (selectedItem) {
  }

  const filteredByOrderVersions = () => {
    var arrayReturn = [];
    var arrayTemp = JSON.parse(JSON.stringify(selectedItem.metadata.versions));

    arrayReturn = arrayTemp.sort(compareDates);

    return arrayReturn;
  };

  function compareDates(a, b) {
    if (a.archivedDate < b.archivedDate) {
      return 1;
    }
    if (a.archivedDate > b.archivedDate) {
      return -1;
    }
    return 0;
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="file-details p-16 sm:p-24"
    >
      <div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.3 } }}
        >
          <StyledIcon className="text-48" type={selectedItem.type} />
        </motion.div>
      </div>

      <Typography variant="subtitle1" className="py-16">
        {t("INFO")}
      </Typography>

      <table className="w-full text-justify">
        <tbody>
          <tr className="type h-52">
            <th className="font-semibold">{t("TYPE")}</th>
            <td>{t(selectedItem.type.toUpperCase())}</td>
          </tr>

          <tr className="modified h-52">
            <th className="font-semibold">{t("MODIFIED")}</th>
            <td>{selectedItem.modified}</td>
          </tr>

          {selectedItem.type !== "folder" ? (
            <tr className="location h-52 text-left">
              <th className="font-semibold">{t("LOCATION")}</th>
              <td>{selectedItem.metadata?.url}</td>
            </tr>
          ) : (
            false
          )}

          {/* <tr className="owner h-52">
            <th className="font-semibold">{t("OWNER")}</th>
            <td>-{selectedItem.owner}</td>
          </tr> */}

          {selectedItem.metadata?.documentType ? (
            <tr className="documentType h-52">
              <th className="font-semibold">{t("DOCUMENT_TYPE")}</th>
              <td>{selectedItem.metadata?.documentType?.name}</td>
            </tr>
          ) : (
            false
          )}
          {selectedItem.type !== "folder" ? (
            <tr className="versionsGeneral h-52">
              <th className="font-semibold">{t("VERSIONS")}</th>
            </tr>
          ) : (
            false
          )}
          {selectedItem.metadata?.type !== "folder" &&
          selectedItem.metadata?.versions
            ? filteredByOrderVersions().map((versionElement) => (
                <tr key={"versions" + versionElement.id}>
                  <th style={{ paddingBottom: "20px" }}>
                    <div style={{ minWidth: "130px" }}>
                      <Icon style={{ paddingRight: "30px" }}>edit</Icon>
                      <div>
                        <a>
                          {new Date(versionElement.archivedDate).toString()}
                        </a>
                      </div>
                    </div>
                  </th>
                </tr>
              ))
            : false}
        </tbody>
      </table>
    </motion.div>
  );
};

export default RightSideBarContent;
