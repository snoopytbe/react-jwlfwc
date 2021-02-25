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
import moment from "moment";

export const ControllerDatePicker = props => {
  const {
    dataName,
    name,
    defaultValue,
    control,
    required,
    onChangeHandler,
    ...other
  } = props;

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
      <Controller
        {...other}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={(value, onChange) => (
          <KeyboardDatePicker
            id={"date-picker-dialog" + name}
            label="Date"
            format="dd/MM/yyyy"
            fullWidth
            value={value}
            onChange={date => {
              onChange(date);
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
  );
};
