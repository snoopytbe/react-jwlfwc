import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { useStyles } from "../../styles/styles";
import { listeDates, checkLastField } from "./occupationMethods";
import { Calendrier } from "../Calendrier/Calendrier";
import { PaperFieldOccupation } from "./PaperFieldOccupation";
import { useStateWithLocalStorage } from "../../utils/useStateWithLocalStorage";

export function Occupation() {
  const [data, setData] = useStateWithLocalStorage("data");

  const { control, handleSubmit, register, getValues } = useForm({
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
    setTimeout(()=>setResultat(listeDates(values),500));
    setModified(false);
  }, [modified]);

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

  function commonProps(item, index) {
    return {
      dataIndex: index,
      control: control,
      changeHandler: changeHandler
    };
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="loge"
          required
          defaultValue=""
          label="Nom de la loge"
          inputRef={register}
        />

        <Typography variant="h6">Réservations régulières</Typography>

        {regulierFields.map((item, index) => {
          return (
            <PaperFieldOccupation
              key={item.id}
              field="regulier"
              data={regulierFields}
              removeHandler={regulierRemove}
              {...commonProps(item, index)}
            />
          );
        })}

        <Typography variant="h6">Réservations exceptionnelles</Typography>

        {exceptionnelFields.map((item, index) => {
          return (
            <PaperFieldOccupation
              key={item.id}
              field="exceptionnel"
              data={exceptionnelFields}
              removeHandler={exceptionnelRemove}
              {...commonProps(item, index)}
            />
          );
        })}

        <Typography variant="h6">
          Suppression exceptionnelle de réservation
        </Typography>

        {suppressionFields.map((item, index) => {
          return (
            <PaperFieldOccupation
              key={item.id}
              field="suppression"
              data={suppressionFields}
              removeHandler={suppressionRemove}
              listValues={resultat.reduce((prev, act) => {
                return [...prev, act.format("dddd DD/MM/YYYY")];
              }, [])}
              {...commonProps(item, index)}
            />
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
