import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import _ from "@lodash";
import { useTranslation } from "react-i18next";
import { extraMainURLFrontend } from "./../../../../AppParams";

function POGeneralTemplateHeader(props) {
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch("featuredImageId");
  const images = watch("images");
  const name = watch("name");
  const theme = useTheme();
  const { t } = useTranslation("poPage");

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            <img
              className="w-32 sm:w-48 rounded"
              src={extraMainURLFrontend+"assets/images/ecommerce/product-image-placeholder.png"}
              alt={name}
            />
          </motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {t("CREATE_NEW_PO")}
              </Typography>
              <Typography variant="caption" className="font-medium">
                {t("PO_DETAIL")}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POGeneralTemplateHeader;
