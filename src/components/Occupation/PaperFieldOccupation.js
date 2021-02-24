import React from "react";
import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ControllerSelect } from "./ControllerSelect";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

export function PaperFieldOccupation(props) {
  const {
    index,
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
        {fieldNames.map((item, index) => {
          return (
            <Grid
              item
              xs={4}
              sm={(index === (fieldNames.length - 1)) ? 3 : 2}
              key={item.id}
            >
              <ControllerSelect
                name={`${field}[${index}].${item}`}
                dataName={item}
                defaultValue={data[field][index]?.[item] ?? ""}
                control={control}
                onChangeHandler={changeHandler}
                required={index + 1 !== data[field].length}
              />
            </Grid>
          );
        })}
        <Grid item xs={1} sm={1}>
          {data[field].length > 1 && index + 1 !== data[field].length && (
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
