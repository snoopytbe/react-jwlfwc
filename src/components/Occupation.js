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
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import moment from "moment";
import "moment/min/locales.min";
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
  const { dataName, name, defaultValue, control, label, ...other } = props;
  const classes = useStyles();
  return (
    <FormControl required fullWidth className={classes.FormControl}>
      <Controller
        {...other}
        name={name}
        control={control}
        defaultValue={defaultValue}
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
      regulier: [
        {
          numerosjours: "1er",
          jours: "mardi",
          temple: "Berteaux (RDC)",
          sallehumide: "Les 2 salles humides",
          heure: "20h30"
        },
        {
          numerosjours: "3eme",
          jours: "vendredi",
          temple: "Berteaux (RDC)",
          sallehumide: "Les 2 salles humides",
          heure: "20h30"
        },
        {
          numerosjours: "5eme",
          jours: "vendredi",
          temple: "Berteaux (RDC)",
          sallehumide: "Salle humide Jardin",
          heure: "20h30"
        }
      ]
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

  const [resultat, setResultat] = React.useState([]);

  const props = () => {
    return GridContainerProp;
  };

  const onSubmit = data => {
    const result = [];

    data.regulier.map(reservation => {
      mois.map(mois => {
        let maDate = nthDay(
          moment(
            new Date(annee + (mois.numero < 9 ? 1 : 0), mois.numero - 1, 1)
          ),
          jours.reduce((prec, value) => {
            return prec + (reservation.jours === value.nom ? value.numero : 0);
          }, 0),
          reservation.numerosjours[0]
        );
        maDate.locale("fr-FR");
        maDate.isValid() && result.push(maDate);
      });
    });

    if (data.hasOwnProperty("exceptionnel"))
      data.exceptionnel.map(exceptionnel => {
        let maDate = moment(exceptionnel.date);
        maDate.locale("fr-FR");
        maDate.isValid() && result.push(maDate);
      });

    let resultSansDoublon = result.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    );

    let resultTrie = resultSansDoublon.sort(
      (a, b) => a.valueOf() - b.valueOf()
    );

    setResultat(resultTrie);
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
        <Typography variant="h6">Réservations exceptionnelles</Typography>

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
      {resultat.map(item => (
        <p>{item.format("dddd DD/MM/YYYY")}</p>
      ))}
    </div>
  );
}
