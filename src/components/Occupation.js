import React, { Fragment } from "react";
import { useForm, Controller, useFieldArray, trigger } from "react-hook-form";
import {
  Select,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography
} from "@material-ui/core";
import { data, jours, mois, annee } from "../data/constantes";
import { keygen } from "../utils/utils";
import { useStyles } from "../styles/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import moment from "moment";
import { nthDay } from "./vacances";
import "date-fns";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

const ControllerSelect = props => {
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
        render={innerprops => (
          <>
            <InputLabel
              shrink
              id={"label" + name}
              style={{ background: "#FFFFFF", padding: "0px 4px " }}
            >
              {data()[dataName].nom}
            </InputLabel>
            <Select
              labelId={"select" + name}
              value={innerprops.value}
              onChange={e => innerprops.onChange(e.target.value)}
            >
              {data()[dataName]["liste"].map(item => (
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
  const { register, control, handleSubmit, watch, errors, setValue } = useForm({
    defaultValues: {
      regulier: [{ numerosjours: "", jours: "", temple: "", sallehumide: "" }],
      exceptionnel: []
    }
  });

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
  }

  const {
    fields: regulierFields,
    append: regulierAppend,
    remove: regulierRemove
  } = useFieldArray({
    control,
    name: "regulier"
  });

  const {
    fields: exceptionnelFields,
    append: exceptionnelAppend,
    remove: exceptionnelRemove
  } = useFieldArray({
    control,
    name: "exceptionnel"
  });

  const [resultat, setResultat] = React.useState("toto");

  const onSubmit = data => {
    var result = [];
    mois.map(mois => {
      let maDate = nthDay(
        moment(new Date(annee + (mois.numero < 9 ? 1 : 0), mois.numero - 1, 1)),
        jours.reduce((prec, value) => {
          return (
            prec + (data.regulier[0].jours === value.nom ? value.numero : 0)
          );
        }, 0),
        data.regulier[0].numerosjours[0]
      );
      maDate.isValid() && result.push(maDate.format());
    });
    setResultat(JSON.stringify(data.toto));
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
        <Typography variant="h6">Réservations régulières</Typography>

        {regulierFields.map((item, index) => (
          <div key={index}>
            <Grid {...props()} container>
              <Grid item xs>
                <ControllerSelect
                  name={`regulier[${index}].numerosjours`}
                  dataName="numerosjours"
                  control={control}
                />
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`regulier[${index}].jours`}
                  control={control}
                  dataName="jours"
                />{" "}
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`regulier[${index}].temple`}
                  control={control}
                  dataName="temple"
                />{" "}
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`regulier[${index}].sallehumide`}
                  control={control}
                  dataName="sallehumide"
                />
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`regulier[${index}].horaires`}
                  control={control}
                  dataName="horaires"
                />
              </Grid>
              <Grid item xs={1}>
                {regulierFields.length > 1 && (
                  <RemoveCircleOutlineIcon
                    color="secondary"
                    onClick={() => {
                      regulierFields.length > 1 && regulierRemove(index);
                    }}
                    style={{ fontSize: 20 }}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            regulierAppend({
              numerosjours: "",
              jours: "",
              temple: "",
              sallehumide: ""
            });
          }}
        >
          Ajouter réservation
        </Button>
        <Typography variant="h6">Réservation exceptionnelle</Typography>

        {exceptionnelFields.map((item, index) => (
          <div key={index}>
            <Grid {...props()} container>
              <Grid item xs>
                <MuiPickersUtilsProvider
                  utils={LocalizedUtils}
                  locale={frLocale}
                >
                  <Controller
                    name={`exceptionnel[${index}].date`}
                    control={control}
                    defaultValue={new Date()}
                    rules={{ required: true }}
                    render={innerprops => (
                      <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="Date de l'opération"
                        format="dd/MM/yyyy"
                        value={innerprops.value}
                        onChange={date => innerprops.onChange(date)}
                        KeyboardButtonProps={{
                          "aria-label": "Changer la date"
                        }}
                        okLabel="Valider"
                        cancelLabel="Annuler"
                      />
                    )}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`exceptionnel[${index}].temple`}
                  control={control}
                  dataName="temple"
                />
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`exceptionnel[${index}].sallehumide`}
                  control={control}
                  dataName="sallehumide"
                />
              </Grid>
              <Grid item xs>
                <ControllerSelect
                  name={`exceptionnel[${index}].horaires`}
                  control={control}
                  dataName="horaires"
                />
              </Grid>
              <Grid item xs={1}>
                {regulierFields.length > 1 && (
                  <RemoveCircleOutlineIcon
                    color="secondary"
                    onClick={() => {
                      exceptionnelFields.length > 1 &&
                        exceptionnelRemove(index);
                    }}
                    style={{ fontSize: 20 }}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            exceptionnelAppend({
              temple: "",
              sallehumide: "",
              horaire: ""
            });
          }}
        >
          Ajouter réservation
        </Button>
        <Typography variant="h6" />
        <Button variant="contained" color="primary" type="submit">
          Enregistrer
        </Button>
      </form>
      {resultat}
    </div>
  );
}
