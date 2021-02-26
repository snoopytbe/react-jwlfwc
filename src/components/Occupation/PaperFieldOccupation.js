import React from "react";
import { Grid, Paper } from "@material-ui/core";
import ControllerSelect from "../ReactHookedForm/ControllerSelect";
import ControllerDatePicker from "../ReactHookedForm/ControllerDatePicker";
import Delete from "../ReactHookedForm/Delete";
import { structureForm, formData } from "../../data/constantes";
import { useStyles } from "../../styles/styles";
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
    dataIndex,
    field,
    control,
    changeHandler,
    removeHandler,
    listValues,
    data,
    ...others
  } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3} >
      <Grid {...GridContainerProp} container>
        {structureForm[field].map(item => {
          const controllerProperties = {
            name: `${field}[${dataIndex}].${item.nom}`,
            dataName: item.nom,
            control: control,
            onChangeHandler: changeHandler,
            required: dataIndex + 1 !== data.length,
            label: formData()[item.nom].nom,
            listValues: listValues ?? formData()[item.nom].liste ?? ""
          };

          return (
            <Grid item xs={item.xs} sm={item.sm} key={item.id}>
              <ControllerSwitch
                {...controllerProperties}
                defaultValue={data[dataIndex]?.[item.nom] ?? ""}
                type={item.type}
              />
            </Grid>
          );
        })}

        <Grid item xs={1} sm={1}>
          <Delete
            maxIndex={data.length}
            removeHandler={removeHandler}
            index={dataIndex}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
