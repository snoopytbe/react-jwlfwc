import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray, trigger } from "react-hook-form";
import {
  Select,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper
} from "@material-ui/core";
import { data, jours, mois, annee } from "../data/constantes";
import { keygen } from "../utils/utils";
import { useStyles } from "../styles/styles";
import DeleteIcon from "@material-ui/icons/Delete";
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
  const {
    dataName,
    name,
    defaultValue,
    control,
    label,
    required,
    onChangeHandler,
    ...other
  } = props;
  const classes = useStyles();
  return (
    <Controller
      {...other}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: { required } }}
      render={({ value, onChange }) => (
        <FormControl
          required={required}
          fullWidth
          className={classes.formControl}
        >
          <InputLabel
            shrink
            id={"label" + name}
            style={{ background: "#FFFFFF", padding: "0px 4px " }}
          >
            {data()[dataName].nom}
          </InputLabel>
          <Select
            shrink
            labelId={"Select" + name}
            value={value}
            onChange={e => {
              onChange(e.target.value);
              onChangeHandler();
            }}
          >
            {data()[dataName]["liste"].map(item => (
              <MenuItem key={keygen()} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

const listeDates = data => {
  const result = [];

  if (data.hasOwnProperty("regulier"))
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

  let resultTrie = resultSansDoublon.sort((a, b) => a.valueOf() - b.valueOf());

  return resultTrie;
};

export function Occupation() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    errors,
    setValue
  } = useForm({
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
        },
        {
          numerosjours: "",
          jours: "",
          temple: "",
          sallehumide: "",
          heure: ""
        }
      ],
      suppression: []
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

  const {
    fields: suppressionFields,
    append: suppressionAppend,
    remove: suppressionRemove
  } = useFieldArray({
    control,
    name: "suppression"
  });

  const [resultat, setResultat] = React.useState([]);
  const [mySelect, setMySelect] = React.useState([]);

  const props = () => {
    return GridContainerProp;
  };

  const onSubmit = data => {
    setResultat(listeDates(data));
    setMySelect(listeDates(data));
  };

  const classes = useStyles();

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
          <Paper className={classes.paper} key={index} elevation={3}>
            <Grid {...props()} container>
              <Grid item xs={4} sm={2}>
                <Controller
                  name={`regulier[${index}].numerosjours`}
                  control={control}
                  defaultValue={item.numerosjours}
                  ref={register}
                  rules={{ required: true }}
                  render={({ value, onChange }) => (
                    <FormControl
                      required={true}
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel
                        shrink
                        id={"label"}
                        style={{ background: "#FFFFFF", padding: "0px 4px " }}
                      >
                        {data()["numerosjours"].nom}
                      </InputLabel>
                      <Select
                        shrink
                        labelId={"Select"}
                        value={value}
                        onChange={e => {
                          onChange(e.target.value);
                        }}
                      >
                        {data()["numerosjours"]["liste"].map(item => (
                          <MenuItem key={keygen()} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                {/* <ControllerSelect
                  name={`regulier[${index}].numerosjours`}
                  dataName="numerosjours"
                  control={control}
                  onChangeHandler={() => setMySelect(listeDates(getValues()))}
                  required={index + 1 !== regulierFields.length}
                /> 
              </Grid>
              <Grid item xs={4} sm={2}>
                <ControllerSelect
                  name={`regulier[${index}].jours`}
                  control={control}
                  dataName="jours"
                  required={index + 1 !== regulierFields.length}
                />
              </Grid>
              <Grid item xs={4} sm={2}>
                <ControllerSelect
                  name={`regulier[${index}].heure`}
                  control={control}
                  dataName="horaires"
                  required={index + 1 !== regulierFields.length}
                />
              </Grid>
              <Grid item xs={4} sm={2}>
                <ControllerSelect
                  name={`regulier[${index}].temple`}
                  control={control}
                  dataName="temple"
                  required={index + 1 !== regulierFields.length}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <ControllerSelect
                  name={`regulier[${index}].sallehumide`}
                  control={control}
                  dataName="sallehumide"
                  required={index + 1 !== regulierFields.length}
                />*/}
              </Grid>
              <Grid item xs={1} sm={1}>
                {regulierFields.length > 1 &&
                  index + 1 !== regulierFields.length && (
                    <DeleteIcon
                      color="primary"
                      onClick={() => {
                        regulierFields.length > 1 && regulierRemove(index);
                        console.log(regulierFields);
                      }}
                      style={{ fontSize: "1.8em" }}
                    />
                  )}
              </Grid>
            </Grid>
          </Paper>
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
          <Paper className={classes.paper} key={index} elevation={3}>
            <Grid {...props()} container>
              <Grid item xs={6} sm={3}>
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
                        label="Date"
                        format="dd/MM/yyyy"
                        fullWidth
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
              <Grid item xs={6} sm={2}>
                <ControllerSelect
                  name={`exceptionnel[${index}].heure`}
                  control={control}
                  dataName="horaires"
                />
              </Grid>
              <Grid item xs={5} sm={3}>
                <ControllerSelect
                  name={`exceptionnel[${index}].temple`}
                  control={control}
                  dataName="temple"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ControllerSelect
                  name={`exceptionnel[${index}].sallehumide`}
                  control={control}
                  dataName="sallehumide"
                />
              </Grid>

              <Grid item xs={1} sm={1}>
                {regulierFields.length > 1 && (
                  <DeleteIcon
                    color="primary"
                    onClick={() => {
                      exceptionnelFields.length > 1 &&
                        exceptionnelRemove(index);
                    }}
                    style={{ fontSize: "1.8em" }}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
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
        <Typography variant="h6">
          Suppression exceptionnelle de réservation
        </Typography>
        {suppressionFields.map((item, index) => (
          <Paper className={classes.paper} key={index} elevation={3}>
            <Grid {...props()} container>
              <Controller
                name="resultat"
                control={control}
                defaultValue=""
                render={innerprops => (
                  <Select
                    shrink
                    labelId="SelectTest"
                    value={innerprops.value}
                    onChange={e => innerprops.onChange(e.target.value)}
                  >
                    {mySelect.map(item => (
                      <MenuItem key={keygen()}>
                        {item.format("dddd DD/MM/YYYY")}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Grid item xs={1} sm={1}>
                {regulierFields.length > 1 && (
                  <DeleteIcon
                    color="primary"
                    onClick={() => {
                      exceptionnelFields.length > 1 &&
                        exceptionnelRemove(index);
                    }}
                    style={{ fontSize: "1.8em" }}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Typography variant="h6" />
        <Button variant="contained" color="primary" type="submit">
          Enregistrer
        </Button>
        <Typography />
      </form>
      {resultat.map(item => (
        <p>{item.format("dddd DD/MM/YYYY")}</p>
      ))}
    </div>
  );
}
