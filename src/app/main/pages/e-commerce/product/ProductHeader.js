import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import { saveProduct, removeProduct } from "../store/productSlice";
import { changeDatosPOs } from "./../store/productsSlice";

function ProductHeader(props) {
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch("featuredImageId");
  const images = watch("images");
  const name = watch("name");
  const theme = useTheme();

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {images.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={_.find(images, { id: featuredImageId }).url}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                Create New PO
              </Typography>
              <Typography variant="caption" className="font-medium">
                PO Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;
