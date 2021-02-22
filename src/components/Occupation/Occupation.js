import React from "react";
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
import { initialValues } from "../../data/initialValues";
import { useStyles } from "../../styles/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import "date-fns";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { ControllerSelect } from "./ControllerSelect";
import { listeDates, checkLastField } from "./occupationMethods";
import { Calendrier } from "../Calendrier/Calendrier";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || initialValues
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export function Occupation() {
  const { register, control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: initialValues
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
  const [modified, setModified] = React.useState(true);

  React.useEffect(() => {
    setResultat(listeDates(initialValues));
  }, []);

  React.useEffect(() => {
    let values = getValues();
    checkLastField(
      values,
      regulierAppend,
      exceptionnelAppend,
      suppressionAppend
    );
    setResultat(listeDates(values));
    setModified(false);
  }, [modified]);

  const props = () => {
    return GridContainerProp;
  };

  const onSubmit = data => {
    //setResultat(listeDates(data));
  };

  const changeHandler = () => {
    setModified(true);
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

        {regulierFields.map((item, index) => {
          return (
            <Paper className={classes.paper} key={item.id} elevation={3}>
              <Grid {...props()} container>
                <Grid item xs={4} sm={2}>
                  <ControllerSelect
                    name={`regulier[${index}].numerosjours`}
                    dataName="numerosjours"
                    control={control}
                    defaultValue={
                      initialValues.regulier[index].numerosjours || ""
                    }
                    onChangeHandler={changeHandler}
                    required={index + 1 !== regulierFields.length}
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <ControllerSelect
                    name={`regulier[${index}].jours`}
                    control={control}
                    onChangeHandler={changeHandler}
                    dataName="jours"
                    defaultValue={initialValues.regulier[index].jours || ""}
                    required={index + 1 !== regulierFields.length}
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <ControllerSelect
                    name={`regulier[${index}].heure`}
                    control={control}
                    onChangeHandler={changeHandler}
                    dataName="heure"
                    defaultValue={initialValues.regulier[index].heure || ""}
                    required={index + 1 !== regulierFields.length}
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <ControllerSelect
                    name={`regulier[${index}].temple`}
                    control={control}
                    dataName="temple"
                    onChangeHandler={changeHandler}
                    defaultValue={initialValues.regulier[index].temple || ""}
                    required={index + 1 !== regulierFields.length}
                  />
                </Grid>
                <Grid item xs={4} sm={3}>
                  <ControllerSelect
                    name={`regulier[${index}].sallehumide`}
                    control={control}
                    onChangeHandler={changeHandler}
                    dataName="sallehumide"
                    defaultValue={
                      initialValues.regulier[index].sallehumide || ""
                    }
                    required={index + 1 !== regulierFields.length}
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  {regulierFields.length > 1 &&
                    index + 1 !== regulierFields.length && (
                      <DeleteIcon
                        color="primary"
                        onClick={() => {
                          if (regulierFields.length > 1) {
                            regulierRemove(index);
                          }
                        }}
                        style={{ fontSize: "1.8em" }}
                      />
                    )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}

        <Typography variant="h6">Réservations exceptionnelles</Typography>

        {exceptionnelFields.map((item, index) => {
          return (
            <Paper className={classes.paper} key={item.id} elevation={3}>
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
                          onChange={date => {
                            innerprops.onChange(date);
                            changeHandler();
                          }}
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
                    onChangeHandler={changeHandler}
                    dataName="heure"
                  />
                </Grid>
                <Grid item xs={5} sm={3}>
                  <ControllerSelect
                    name={`exceptionnel[${index}].temple`}
                    control={control}
                    onChangeHandler={changeHandler}
                    dataName="temple"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ControllerSelect
                    name={`exceptionnel[${index}].sallehumide`}
                    control={control}
                    onChangeHandler={changeHandler}
                    dataName="sallehumide"
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  {exceptionnelFields.length > 1 &&
                    index + 1 !== exceptionnelFields.length && (
                      <DeleteIcon
                        color="primary"
                        onClick={() => {
                          if (exceptionnelFields.length > 1) {
                            exceptionnelRemove(index);
                          }
                        }}
                        style={{ fontSize: "1.8em" }}
                      />
                    )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}

        <Typography variant="h6">
          Suppression exceptionnelle de réservation
        </Typography>
        {suppressionFields.map((item, index) => {
          return (
            <Paper className={classes.paper} key={item.id} elevation={3}>
              <Grid {...props()} container>
                <Grid item xs={4}>
                  <Controller
                    name={`suppression[${index}].date`}
                    control={control}
                    render={({ value, onChange }) => (
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel
                          shrink
                          id={"label" + `suppression[${index}].date`}
                          style={{ background: "#FFFFFF", padding: "0px 4px " }}
                        >
                          Date
                        </InputLabel>
                        <Select
                          shrink
                          labelId={"label" + `suppression[${index}].date`}
                          value={value}
                          onChange={e => {
                            onChange(e.target.value);
                            changeHandler();
                          }}
                          defaultValue=""
                        >
                          {resultat.map(item => (
                            <MenuItem
                              key={item.id}
                              value={item.format("dddd DD/MM/YYYY")}
                            >
                              {item.format("dddd DD/MM/YYYY")}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={1} sm={1}>
                  {suppressionFields.length > 1 &&
                    index + 1 !== suppressionFields.length && (
                      <DeleteIcon
                        color="primary"
                        onClick={() => {
                          if (suppressionFields.length > 1) {
                            suppressionRemove(index);
                          }
                        }}
                        style={{ fontSize: "1.8em" }}
                      />
                    )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}

        <Typography variant="h6" />
        <Button variant="contained" color="primary" type="submit">
          Valider
        </Button>
        <Typography variant="h6" />
        <Calendrier data={resultat} />
      </form>
    </div>
  );
}
