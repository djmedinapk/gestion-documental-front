/*import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";*/
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Icon,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TableFooter,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
//import useStyles from "../../../theme/useStyles";
//import { addProduct, deleteProduct, getProducts, updateProduct } from "../../../actions/productsAction";
//import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ExamplePage = () => {
  //const classes = useStyles();
  const [productsList, setproductsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    description: "",
    itemId: "",
    sku: 0,
  });

  const getListProducts = async () => {
    const { data } = await getProducts();
    setproductsList(data);
  };

  useEffect(() => {
    //getListProducts();
    const data = [
      { id: 1, name: "pepe", description: "fdgdfg" },
      { id: 2, name: "hola", description: "ggggg" },
      { id: 3, name: "hola", description: "ggggg" },
      { id: 4, name: "hola", description: "ggggg" },
      { id: 5, name: "hola", description: "ggggg" },
      { id: 6, name: "hola", description: "ggggg" },
      { id: 7, name: "hola", description: "ggggg" },
      { id: 8, name: "hola", description: "ggggg" },
    ];
    setproductsList(data);
  }, []);

  const updateData = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const clearAndtoggle = () => {
    setProduct({
      id: 0,
      description: "",
      itemId: "",
    });
    setOpenModal(false);
  };

  const editProduct = (dc) => {
    setProduct(dc);
    setOpenModal(true);
  };

  const addNewProduct = () => {
    setProduct({
      id: 0,
      description: "",
      itemId: "",
      sku: 0,
    });
    setOpenModal(true);
  };

  const saveProduct = () => {
    const saveChanges = async () => {
      if (product.id) {
        await updateProduct(product);
        getListProducts();
      } else {
        await addProduct(product);
        getListProducts();
      }
    };
    saveChanges();
    clearAndtoggle();
  };

  const deleteProductT = () => {
    const deleteProducto = async () => {
      await deleteProduct(product.id);
      getListProducts();
    };
    deleteProducto();
    clearAndtoggle();
  };

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography align="left" variant="h4" color="primary">
            Product Type
          </Typography>
          <br></br>
        </Grid>

        <Grid
          item
          xs={12}
          className=" sm:border-1 sm:rounded-16 overflow-hidden"
        >
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Description
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    ></Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsList.map((dc) => (
                  <TableRow key={dc.id}>
                    <TableCell>
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        {dc.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        {dc.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        {dc.description}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          editProduct(dc);
                        }}
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <IconButton color="inherit" onClick={addNewProduct}>
                  Add New
                  <Icon>note_add</Icon>
                </IconButton>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={openModal} maxWidth={"xs"} fullWidth>
        <DialogTitle style={{ display: "flex" }}>
          <Typography variant="body1" color="primary">
            <IconButton onClick={clearAndtoggle} color="primary">
              <ArrowBackIcon />
            </IconButton>
            Add Product
          </Typography>
        </DialogTitle>
        <DialogContent>
          <br></br>
          <form>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  defaultValue={product.name}
                  fullWidth
                  onChange={updateData}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  defaultValue={product.description}
                  fullWidth
                  onChange={updateData}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          {product.id ? (
            <Button
              onClick={deleteProductT}
              variant="contained"
              fullWidth
              color="secondary"
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          <Button
            onClick={saveProduct}
            variant="contained"
            fullWidth
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExamplePage;
