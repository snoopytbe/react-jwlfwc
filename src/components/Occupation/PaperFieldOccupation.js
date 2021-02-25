import React from "react";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ControllerSelect } from "./ControllerSelect";
import { structureForm } from "../../data/constantes";

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
          return (
            <Grid
              item
              xs={4}
              sm={index === fieldNames.length - 1 ? 3 : 2}
              key={item.id}
            >
              <ControllerSelect
                name={`${field}[${indexField}].${item.nom}`}
                dataName={item.nom}
                defaultValue={data[field][indexField]?.[item.nom] ?? ""}
                control={control}
                onChangeHandler={changeHandler}
                required={indexField + 1 !== data[field].length}
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
