import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

function RightSideBarHeader(props) {
  const selectedItem = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItem
  );

  const { t } = useTranslation("searchPage");

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between h-full p-4 sm:p-12">
      <div className="toolbar flex align-center justify-end">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
          <IconButton size="large">
            <Icon>delete</Icon>
          </IconButton>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
          <IconButton size="large">
            <Icon>cloud_download</Icon>
          </IconButton>
        </motion.div>
        <IconButton size="large">
          <Icon>more_vert</Icon>
        </IconButton>
      </div>
      <div className="p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
        >
          <Typography variant="subtitle1" className="mb-8 font-semibold">
            {selectedItem.name}
          </Typography>
        </motion.div>
       
      </div>
    </div>
  );
}

export default RightSideBarHeader;
