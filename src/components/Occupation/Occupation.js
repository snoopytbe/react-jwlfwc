import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { useStyles } from "../../styles/styles";
import { listeDates, checkLastField } from "./occupationMethods";
import { Calendrier } from "../Calendrier/Calendrier";
import { PaperFieldOccupation } from "./PaperFieldOccupation";
import { useStateWithLocalStorage } from "../../utils/useStateWithLocalStorage";
import { initialValues } from "../../data/initialValues";
import { useHistory } from "react-router-dom";

export default function Occupation(props) {
  const { data, setData, id } = props;

  const { control, handleSubmit, register, getValues, setValue } = useForm({
    defaultValues: data[id]
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

  React.useEffect(() => {
    /*setTimeout(
      () =>
        setValue("regulier", [
          {
            numerosjours: "5eme",
            jours: "vendredi",
            temple: "Berteaux (RDC)",
            sallehumide: "Salle humide Jardin",
            heure: "20h30"
          },
          {
            numerosjours: "",
            jours: "",
            temple: "",
            sallehumide: "",
            heure: ""
          }
        ]),
      1000
    );*/

    setResultat(listeDates(data));
  }, []);

  const onSubmit = data => {
    setData(data);
  };

  const changeHandler = () => {
    let values = getValues();
    checkLastField(
      values,
      regulierAppend,
      exceptionnelAppend,
      suppressionAppend
    );
    setTimeout(() => setResultat(listeDates(values), 500));
  };

  const classes = useStyles();

  const calendrierMemoized = React.useMemo(
    () => <Calendrier data={resultat} />,
    [resultat]
  );

  var history = useHistory();

  function commonProps(item, index) {
    return {
      dataIndex: index,
      control: control,
      changeHandler: changeHandler
    };
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h4">Réservation</Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => history.push("/TableauSynthese/")}
      >
        Retour au tableau de synthèse
      </Button>
      <br />
      <br />
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
