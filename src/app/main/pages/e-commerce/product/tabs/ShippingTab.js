import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

function ShippingTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const [map, setMap] = useState("shipping");

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="width"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label="PO"
              autoFocus
              id="width"
              size="small"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="depth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8  mx-4"
              label="Pediment"
              id="depth"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
      </div>
      <div className="flex -mx-4">
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Year</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            // value="all"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Month</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex -mx-4">
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Type</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className="w-full mt-8  mx-4" size="small">
          <InputLabel id="category-select-label">Client</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Accordion
        className="border-0 shadow-0 overflow-hidden"
        expanded={map === "shipping"}
        onChange={() => setMap(map !== "shipping" ? "shipping" : false)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{ root: "border border-solid rounded-16 mt-16" }}
        >
          <Typography className="font-semibold">Aduanas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col md:flex-row -mx-8">
            <Controller
              name="depth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8  mx-4"
                  label="DODA"
                  id="depth"
                  variant="outlined"
                  size="small"
                  disabled={true}
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="mt-8  mx-4"
              //onClick={handleRemoveProduct}
              startIcon={<Icon size="small">save</Icon>}
              size="small"
              style={{ minWidth: "15%" }}
            >
              Choose File
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt-8  mx-4"
              //onClick={handleRemoveProduct}
              size="small"
            >
              <Icon>help</Icon>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row -mx-8">
            <Controller
              name="depth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8  mx-4"
                  label="Pediment"
                  id="depth"
                  variant="outlined"
                  size="small"
                  disabled={true}
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="mt-8  mx-4 md:w-25"
              //onClick={handleRemoveProduct}
              startIcon={<Icon size="small">save</Icon>}
              size="small"
              style={{ minWidth: "15%" }}
              
            >
              Choose File
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt-8  mx-4"
              //onClick={handleRemoveProduct}

              size="small"
              
            >
              <Icon>help</Icon>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row -mx-8">
            <Button
              variant="contained"
              color="inherit"
              className="mt-8  mx-4"
              //onClick={handleRemoveProduct}
              startIcon={<Icon>add</Icon>}
              size="small"
              fullWidth
            ></Button>
          </div>
          <Accordion
            className="border-0 shadow-0 overflow-hidden"
            //expanded={map === "prueba"}
            //onChange={() => setMap(map !== "prueba" ? "prueba" : false)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: "border border-solid rounded-16 mt-16" }}
            >
              <Typography className="font-semibold">Subcarpeta</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col md:flex-row -mx-8">
                <Controller
                  name="depth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4 md-2"
                      label="DODA"
                      id="depth"
                      variant="outlined"
                      size="small"
                      disabled={true}
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-8  mx-4 md:w-25"
                  //onClick={handleRemoveProduct}
                  startIcon={<Icon size="small">save</Icon>}
                  size="small"
                  style={{ minWidth: "15%" }}
                  
                >
                  Choose File
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-8  mx-4"
                  //onClick={handleRemoveProduct}

                  size="small"
                  
                >
                  <Icon>help</Icon>
                </Button>
              </div>
              <div className="flex flex-col md:flex-row -mx-8">
                <Controller
                  name="depth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label="Pediment"
                      id="depth"
                      variant="outlined"
                      size="small"
                      disabled={true}
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-8  mx-4 md:w-25"
                  //onClick={handleRemoveProduct}
                  startIcon={<Icon size="small">save</Icon>}
                  size="small"
                  style={{ minWidth: "15%" }}
                  
                >
                  Choose File
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-8  mx-4"
                  //onClick={handleRemoveProduct}

                  size="small"
                  
                >
                  <Icon>help</Icon>
                </Button>
              </div>
              <div className="flex flex-col md:flex-row -mx-8">
                <Controller
                  name="depth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label="Pediment"
                      id="depth"
                      variant="outlined"
                      size="small"
                      disabled={true}
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-8  mx-4 md:w-25"
                  //onClick={handleRemoveProduct}
                  startIcon={<Icon size="small">save</Icon>}
                  size="small"
                  style={{ minWidth: "15%" }}
                  
                >
                  Choose File
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-8  mx-4"
                  //onClick={handleRemoveProduct}

                  size="small"
                  
                >
                  <Icon>help</Icon>
                </Button>
              </div>
              <div className="flex flex-col md:flex-row -mx-8">
                <Controller
                  name="depth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label="Pediment"
                      id="depth"
                      variant="outlined"
                      size="small"
                      disabled={true}
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-8  mx-4 md:w-25"
                  //onClick={handleRemoveProduct}
                  startIcon={<Icon size="small">save</Icon>}
                  size="small"
                  style={{ minWidth: "15%" }}
                  
                >
                  Choose File
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-8  mx-4"
                  //onClick={handleRemoveProduct}

                  size="small"
                  
                >
                  <Icon>help</Icon>
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ShippingTab;
