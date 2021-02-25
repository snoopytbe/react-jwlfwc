import React from "react";
import { Controller } from "react-hook-form";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { data } from "../../data/constantes";
import { useStyles } from "../../styles/styles";

export const ControllerSelect = props => {
  const {
    dataName,
    name,
    defaultValue,
    control,
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
            defaultValue=""
            value={value}
            onChange={e => {
              onChange(e.target.value);
              onChangeHandler();
            }}
          >
            {data()[dataName]["liste"].map(item => (
              <MenuItem key={item.id} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
