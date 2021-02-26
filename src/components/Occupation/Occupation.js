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
import { listeDates, checkLastField } from "./occupationMethods";
import { Calendrier } from "../Calendrier/Calendrier";
import { PaperFieldOccupation } from "./PaperFieldOccupation";

const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

const useStateWithLocalStorage = localStorageKey => {
  var storedValue = localStorage.getItem(localStorageKey);
  storedValue = JSON.parse(storedValue);
  if (!storedValue.hasOwnProperty("regulier")) storedValue = initialValues;
  const [value, setValue] = React.useState(storedValue);

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export function Occupation() {
  const [data, setData] = useStateWithLocalStorage("data");

  const { register, control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: data
  });

  const {
    fields: regulierFields,
    append: regulierAppend,
    remove: regulierRemove
  } = useFieldArray({
    control,
    name: "regulier"
  });

  const {
    fields: exceptionnelFields,
    append: exceptionnelAppend,
    remove: exceptionnelRemove
  } = useFieldArray({
    control,
    name: "exceptionnel"
  });

  const {
    fields: suppressionFields,
    append: suppressionAppend,
    remove: suppressionRemove
  } = useFieldArray({
    control,
    name: "suppression"
  });

  const [resultat, setResultat] = React.useState([]);
  const [modified, setModified] = React.useState(true);

  React.useEffect(() => {
    setResultat(listeDates(data));
  }, []);

  React.useEffect(() => {
    let values = getValues();
    checkLastField(
      values,
      regulierAppend,
      exceptionnelAppend,
      suppressionAppend
    );
    setResultat(listeDates(values));
    setModified(false);
  }, [modified]);

  const props = () => {
    return GridContainerProp;
  };

  const onSubmit = data => {
    setData(data);
  };

  const changeHandler = () => {
    setModified(true);
  };

  const classes = useStyles();

  const calendrierMemoized = React.useMemo(
    () => <Calendrier data={resultat} />,
    [resultat]
  );

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="loge"
          required
          defaultValue="LBF"
          label="Nom de la loge"
        />

        <Typography variant="h6">Réservations régulières</Typography>

        {regulierFields.map((item, index) => {
          return (
            <PaperFieldOccupation
              key={item.id}
              indexField={index}
              field="regulier"
              fieldNames={[
                "numerosjours",
                "jours",
                "heure",
                "temple",
                "sallehumide"
              ]}
              control={control}
              changeHandler={changeHandler}
              removeHandler={regulierRemove}
              paperStyle={classes.paper}
              data={data}
            />
          );
        })}

        <Typography variant="h6">Réservations exceptionnelles</Typography>

        {exceptionnelFields.map((item, index) => {
          return (
            <PaperFieldOccupation
              key={item.id}
              indexField={index}
              field="exceptionnel"
              fieldNames={["date", "heure", "temple", "sallehumide"]}
              control={control}
              changeHandler={changeHandler}
              removeHandler={regulierRemove}
              paperStyle={classes.paper}
              data={data}
            />
          );
        })}

        <Typography variant="h6">  
          Suppression exceptionnelle de réservation
        </Typography>

        {suppressionFields.map((item, index) => {
          return (
            <Paper className={classes.paper} key={item.id} elevation={3}>
              <Grid {...props()} container>
                <Grid item xs={4}>
                  <Controller
                    name={`suppression[${index}].date`}
                    control={control}
                    render={({ value, onChange }) => (
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel
                          shrink
                          id={"label" + `suppression[${index}].date`}
                          style={{ background: "#FFFFFF", padding: "0px 4px " }}
                        >
                          Date
                        </InputLabel>
                        <Select
                          labelId={"label" + `suppression[${index}].date`}
                          value={value}
                          defaultValue={
                            typeof data.suppression[index] === "undefined"
                              ? ""
                              : data.suppression[index].date
                          }
                          onChange={e => {
                            onChange(e.target.value);
                            changeHandler();
                          }}
                        >
                          {resultat.map(item => (
                            <MenuItem
                              key={item.id}
                              value={item.format("dddd DD/MM/YYYY")}
                            >
                              {item.format("dddd DD/MM/YYYY")}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={1} sm={1}>
                  {suppressionFields.length > 1 &&
                    index + 1 !== suppressionFields.length && (
                      <DeleteIcon
                        color="primary"
                        onClick={() => {
                          if (suppressionFields.length > 1) {
                            suppressionRemove(index);
                          }
                        }}
                        style={{ fontSize: "1.8em" }}
                      />
                    )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}

        <Typography variant="h6" />
        <Button variant="contained" color="primary" type="submit">
          Valider
        </Button>
        <Typography variant="h6" />
        {calendrierMemoized}
      </form>
    </div>
  );
}
