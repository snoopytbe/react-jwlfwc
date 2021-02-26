import React from "react";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ControllerSelect } from "./ControllerSelect";
import { ControllerDatePicker } from "./ControllerDatePicker";
import { structureForm, formData } from "../../data/constantes";
import moment from "moment";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

function ControllerSwitch(props) {
  const { defaultValue, type, ...controllerProperties } = props;

  switch (type) {
    case "Select":
      return (
        <ControllerSelect
          {...controllerProperties}
          defaultValue={defaultValue}
        />
      );
      break;
    case "DatePicker":
      return (
        <ControllerDatePicker
          {...controllerProperties}
          defaultValue={
            defaultValue ? moment(defaultValue).toDate() : new Date()
          }
        />
      );
      break;
    default:
      "";
  }
}

export function PaperFieldOccupation(props) {
  const {
    indexField,
    field,
    fieldNames,
    control,
    changeHandler,
    removeHandler,
    paperStyle,
    data,
    ...others
  } = props;

  return (
    <Paper className={paperStyle} elevation={3} {...others}>
      <Grid {...GridContainerProp} container>
        {structureForm[field].map((item) => {
          const controllerProperties = {
            name: `${field}[${indexField}].${item.nom}`,
            dataName: item.nom,
            control: control,
            onChangeHandler: changeHandler,
            required: indexField + 1 !== data[field].length,
            label: formData()[item.nom].nom,
            listValues: formData()[item.nom].liste ?? ""
          };

          return (
            <Grid item xs={item.xs} sm={item.sm} key={item.id}>
              <ControllerSwitch
                {...controllerProperties}
                defaultValue={data[field][indexField]?.[item.nom] ?? ""}
                type={item.type}
              />
            </Grid>
          );
        })}
        <Grid item xs={1} sm={1}>
          {data[field].length > 1 && indexField + 1 !== data[field].length && (
            <DeleteIcon
              color="primary"
              onClick={() => {
                if (fieldLength > 1) {
                  removeHandler(index);
                }
              }}
              style={{ fontSize: "1.8em" }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
