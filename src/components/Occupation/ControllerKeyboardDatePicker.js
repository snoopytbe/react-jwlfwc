import React from "react";
import { Controller } from "react-hook-form";
import { data } from "../../data/constantes";

export const ControllerSelect = props => {
  const {
    dataName,
    donnees,
    name,
    defaultValue,
    control,
    label,
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
        defaultValue={
          data.exceptionnel[index]?.date
            ? moment(data.exceptionnel[index].date).toDate()
            : new Date()
        }
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
  );
};
