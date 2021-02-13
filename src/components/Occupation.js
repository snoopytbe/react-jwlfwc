import React, { Fragment } from "react";
import { useForm, Controller, useFieldArray, trigger } from "react-hook-form";
import {
  Select,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from "@material-ui/core";
import { data, jours, mois, annee } from "../data/constantes";
import { keygen } from "../utils/utils";
import { useStyles } from "../styles/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import moment from "moment";
import { nthDay } from "./vacances";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

const ControllerSelect = (props) => {
  const { dataName, name, control, label, ...other } = props;
  const classes = useStyles();
  return (
    <FormControl required fullWidth className={classes.FormControl}>
      <Controller
        {...other}
        name={name}
        control={control}
        defaultValue={data()[dataName]["liste"][0]}
        rules={{ required: true }}
        render={(innerprops) => (
          <>
            <InputLabel
              shrink
              id={"label" + name}
              style={{ background: "#FFFFFF", padding: "0px 4px " }}>
              {data()[dataName].nom}
            </InputLabel>
            <Select
              labelId={"select" + name}
              value={innerprops.value}
              onChange={(e) => innerprops.onChange(e.target.value)}>
              {data()[dataName]["liste"].map((item) => (
                <MenuItem key={keygen()} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
    </FormControl>
  );
};

export function Occupation() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "donnees"
  });

  const [resultat, setResultat] = React.useState("toto");

  const isInitalRender = React.useRef(true);

  React.useEffect(() => {
    if (!fields.length && !isInitalRender.current) {
      trigger("donnees");
    }

    if (isInitalRender.current) {
      append({ numerosjours: "", jours: "", temple: "", sallehumide: "" });
      isInitalRender.current = false;
    }
  }, [fields, register, setValue, trigger]);

  const onSubmit = (data) => {
    var result = [];
    mois.map((mois) => {
      let maDate = nthDay(
        moment(new Date(annee + (mois.numero < 9 ? 1 : 0), mois.numero - 1, 1)),
        jours.reduce((prec, value) => {
          return (
            prec + (data.donnees[0].jours === value.nom ? value.numero : 0)
          );
        }, 0),
        data.donnees[0].numerosjours[0]
      );
      maDate.isValid() && result.push(maDate.format());
    });
    setResultat(JSON.stringify(result));
  };

  const props = () => {
    return GridContainerProp;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="loge"
          required
          defaultValue="LBF"
          label="Nom de la loge"
        />
        <Grid {...props()} container>
          {fields.map((item, index) => (
            <Fragment key={index}>
              <Grid item xs>
                <ControllerSelect
                  name={`donnees[${index}].numerosjours`}
                  dataName="numerosjours"
                  control={control}
                />
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`donnees[${index}].jours`}
                  control={control}
                  dataName="jours"
                />{" "}
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`donnees[${index}].temple`}
                  control={control}
                  dataName="temple"
                />{" "}
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`donnees[${index}].sallehumide`}
                  control={control}
                  dataName="sallehumide"
                />
              </Grid>
              <Grid item xs={1}>
                <AddCircleOutlineIcon
                  color="primary"
                  onClick={() => {
                    append({
                      numerosjours: "",
                      jours: "",
                      temple: "",
                      sallehumide: ""
                    });
                  }}
                  style={{ fontSize: 20 }}
                />
                {fields.length > 1 && (
                  <RemoveCircleOutlineIcon
                    color="secondary"
                    onClick={() => {
                      fields.length > 1 && remove(index);
                    }}
                    style={{ fontSize: 20 }}
                  />
                )}
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Enregistrer
        </Button>
      </form>
      {resultat}
    </div>
  );
}
