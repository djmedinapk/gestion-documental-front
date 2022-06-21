import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import reducer from "../store";
import POEditGeneralTemplateHeader from "./POEditGeneralTemplateHeader";
import EditPOTab from "./tabs/EditPOTab";

import { getProductTypes } from "./../store/productTypesAdminSlice";

import { getDocumentTypes } from "./../store/documentTypesAdminSlice";
import { useTranslation } from "react-i18next";

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    minHeight: 72,
    height: 72,
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required("You must enter a product name")
    .min(5, "The product name must be at least 5 characters"),
});

function POEditGeneralTemplate(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation("poPage");
  const product = useSelector(({ poEditGeneralTemplateApp }) => poEditGeneralTemplateApp.product);

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    
    dispatch(getProductTypes());
    dispatch(getDocumentTypes());

  }, [dispatch, routeParams]);

  useEffect(() => {
    
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
  }, [product, reset]);

  useEffect(() => {
    
    return () => {
      /**
       * Reset POEditGeneralTemplate on component unload
       */
      dispatch(getProductTypes());
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }


  return (
    <FormProvider {...methods}>
      <Root
        header={<POEditGeneralTemplateHeader />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64" label={t("EDIT_PO")} />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <EditPOTab />
            </div>
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default withReducer("poEditGeneralTemplateApp", reducer)(POEditGeneralTemplate);
