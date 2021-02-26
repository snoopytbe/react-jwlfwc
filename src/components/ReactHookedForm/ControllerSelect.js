import React from "react";
import { Controller } from "react-hook-form";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { useStyles } from "../../styles/styles";

export default function ControllerSelect(props) {
  const {
    dataName,
    name,
    defaultValue,
    label,
    listValues,
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
            {label}
          </InputLabel>
          <Select
            labelId={"Select" + name}
            defaultValue=""
            value={value}
            onChange={e => {
              onChange(e.target.value);
              onChangeHandler();
            }}
          >
            {listValues.map(item => (
              <MenuItem key={item.id} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
