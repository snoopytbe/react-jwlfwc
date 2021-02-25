import React from "react";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ControllerSelect } from "./ControllerSelect";
import { ControllerDatePicker } from "./ControllerDatePicker";
import { structureForm } from "../../data/constantes";
import moment from "moment";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

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
        {structureForm[field].map((item, index) => {
          const controllerProperties = {
            name: `${field}[${indexField}].${item.nom}`,
            dataName: item.nom,
            control: control,
            onChangeHandler: changeHandler,
            required: indexField + 1 !== data[field].length
          };

          switch (item.type) {
            case "Select":
              return (
                <Grid item xs={item.xs} sm={item.sm} key={item.id}>
                  <ControllerSelect
                    {...controllerProperties}
                    defaultValue={data[field][indexField]?.[item.nom] ?? ""}
                  />
                </Grid>
              );
              break;
            case "DatePicker":
              return (
                <Grid item xs={item.xs} sm={item.sm} key={item.id}>
                  <ControllerDatePicker
                    {...controllerProperties}
                    defaultValue={
                      data[field][indexField]?.[item.nom]
                        ? moment(data[field][indexField]?.[item.nom]).toDate()
                        : new Date()
                    }
                  />
                </Grid>
              );
              break;
            default:
              "";
          }
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
