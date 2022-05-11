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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

import { changeDatosPOs } from "./../../store/productsSlice";

const ShippingTab = () => {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control } = methods;
  const datosSS = JSON.parse(
    JSON.stringify(
      useSelector(({ eCommerceApp }) => eCommerceApp.products.datosPOs)
    )
  );

  const handleUpdate = () => {
    dispatch(changeDatosPOs(datosSS));
  };

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
      {datosSS.folders.map((folder, i) => (
        <AcordionComponent
          //map={map}
          key={i}
          dataPO={folder}
          control={control}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

const AcordionComponent = (props) => {
  const dispatch = useDispatch();

  const params = useSelector(
    ({ eCommerceApp }) => eCommerceApp.products.datosPOs
  );

  const [map, setMap] = useState(props.dataPO.name);

  useEffect(() => {}, [props, params]);

  const handleAdd = () => {
    //console.log(props.dataPO);
    /* props.dataPO.folders.push({
      name: "Pepe",
      statePO: "new",
      files: [{ name: "Factura Agente Aduanal (.pdf)", statePO: "new", }],
      folders: [],
    });
    props.dataPO.files.push({ name: "Factura Agente Aduanal (.pdf)", statePO: "new", });*/
    props.dataPO.files.push({
      name: "Factura Agente Aduanal (.pdf6)",
      statePO: "new",
    });
    props.handleUpdate();
  };

  return (
    <Accordion
      className="border-0 shadow-0 overflow-hidden"
      expanded={map === props.dataPO.name}
      onChange={() =>
        setMap(map !== props.dataPO.name ? props.dataPO.name : false)
      }
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ root: "border border-solid rounded-16 mt-16" }}
      >
        <Typography className="font-semibold">{props.dataPO.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.dataPO.files !== null ? (
          props.dataPO.files.map((file, i) =>
            file.statePO === "old" ? (
              <div key={i} className="flex flex-col md:flex-row -mx-8">
                <Controller
                  name={file.name}
                  control={props.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label={file.name}
                      id={file.name}
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
            ) : file.statePO === "new" ? (
              <div key={i} className="flex flex-col md:flex-row -mx-8">
                <FormControl className="w-full mt-8  mx-4" size="small">
                  <InputLabel id="category-select-label">More Files</InputLabel>
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
                <Controller
                  name={file.name}
                  control={props.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8  mx-4"
                      label={file.name}
                      //id={file.name}
                      variant="outlined"
                      size="small"
                      style={{ minWidth: "50%" }}
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
                <Button
                  variant="contained"
                  color="error"
                  className="mt-8  mx-4"
                  //onClick={handleRemoveProduct}
                  size="small"
                >
                  <Icon>delete</Icon>
                </Button>
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}

        {props.dataPO.folders !== null ? (
          props.dataPO.folders.map((folder) => (
            <AcordionComponent
              key={folder.name}
              dataPO={folder}
              control={props.control}
              handleUpdate={props.handleUpdate}
            />
          ))
        ) : (
          <></>
        )}
        <div className="flex flex-col md:flex-row -mx-8 pt-20">
          <FormControl className="w-full mt-8  mx-4" size="small">
            <InputLabel id="category-select-label">Type</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
            >
              <MenuItem value="folder">
                <em> Folder </em>
              </MenuItem>
              <MenuItem value="file">
                <em> File </em>
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="info"
            className="mt-8  mx-4"
            onClick={handleAdd}
            startIcon={<Icon>add_circle</Icon>}
            size="small"
            style={{ minWidth: "80%" }}
            fullWidth
          ></Button>
        </div>
        <div className="pt-20">
        <hr style={{borderTop: "3px solid #bbb"}}/>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShippingTab;
