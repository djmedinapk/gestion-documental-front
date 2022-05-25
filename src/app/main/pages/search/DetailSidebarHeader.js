import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

function DetailSidebarHeader(props) {
  const selectedItem = useSelector(
    ({ searchApp }) => searchApp.searchs.selectedItem
  );

  const { t } = useTranslation("searchPage");

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between h-full p-4 sm:p-12">
      <div className="p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
        >
          <Typography variant="subtitle1" className="mb-8 font-semibold">
            {selectedItem.name}
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography variant="caption" className="font-medium">
            <span>{t("EDITED")}</span>
            <span>: {new Date(selectedItem.lastUpdated).toDateString()}</span>
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}

export default DetailSidebarHeader;
