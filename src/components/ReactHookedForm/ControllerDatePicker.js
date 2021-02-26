import React from "react";
import { Controller } from "react-hook-form";
import "date-fns";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function ControllerDatePicker(props) {
  const {
    name,
    defaultValue,
    label,
    control,
    required,
    onChangeHandler,
    ...other
  } = props;

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
  }

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
      <Controller
        {...other}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: { required } }}
        render={({ value, onChange }) => (
          <KeyboardDatePicker
            id={"date-picker-dialog" + name}
            label={label}
            format="dd/MM/yyyy"
            fullWidth
            value={value}
            onChange={date => {
              onChange(date);
              onChangeHandler();
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
}
