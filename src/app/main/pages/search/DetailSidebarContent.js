import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import StyledIcon from "./StyledIcon";

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

const DetailSidebarContent = (props) => {
  const selectedItem = useSelector(
    ({ searchApp }) => searchApp.searchs.selectedItem
  );
  const [icon, setIcon] = useState([]);

  const { t } = useTranslation("searchPage");

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.hasOwnProperty("documentType")) {
        setIcon("document");
      } else {
        setIcon("folder");
      }
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return null;
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
          {selectedItem.documentType ? (
            <StyledIcon
              className="text-48"
              type={selectedItem.documentType.icon}
            />
          ) : (
            <StyledIcon className="text-48" type="folder" />
          )}
        </motion.div>
      </div>

      <Typography variant="subtitle1" className="py-16">
        {t("INFO")}
      </Typography>

      <table className="w-full text-justify">
        <tbody>
          <tr className="type h-52">
            <th className="font-semibold">{t("TYPE")}</th>
            <td>
              {selectedItem.documentType
                ? t(selectedItem.documentType?.icon?.toUpperCase())
                : t("FOLDER")}
            </td>
          </tr>
          {console.log(selectedItem)}

          <tr className="modified h-52">
            <th className="font-semibold">{t("MODIFIED")}</th>
            <td>{new Date(selectedItem.lastUpdated).toDateString()}</td>
          </tr>

          {selectedItem.url ? (
            <tr className="location h-52 text-left">
              <th className="font-semibold">{t("LOCATION")}</th>
              <td>{selectedItem.url ? selectedItem.url : false}</td>
            </tr>
          ) : (
            false
          )}

          {/* <tr className="owner h-52">
            <th className="font-semibold">{t("OWNER")}</th>
            <td>-{selectedItem.owner}</td>
          </tr> */}

          {selectedItem.documentType ? (
            <tr className="documentType h-52">
              <th className="font-semibold">{t("DOCUMENT_TYPE")}</th>
              <td>{selectedItem.documentType?.name}</td>
            </tr>
          ) : (
            false
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DetailSidebarContent;
