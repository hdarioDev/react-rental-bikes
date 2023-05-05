import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";
import { Form, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { Formik, Field } from "formik";

import {
  ElectricBikeRentalPriceStrategy,
  NormalBikeRentalPriceStrategy,
  OldBikeRentalPriceStrategy,
  RentalPriceStrategy,
} from "../../../hooks/useRentalPriceCalculator";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  date: Date;
  days: number;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  date: new Date(),
  days: 1,
};

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  date: Yup.date().required("La fecha es obligatoria"),
  days: Yup.number()
    .positive("El número de días debe ser mayor que cero")
    .required("El número de días es obligatorio"),
});

interface Props {
  setRentalPrice: (value: number) => void;
  type: string;
}

const FormRental = ({ setRentalPrice, type }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { rentals, addItem } = useLocalStorage();

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [days, setDays] = React.useState(1);

  const onSubmit = (values: FormValues) => {
    values.days = days;
    console.log("a guardar el valor", values);
    console.log("luce el valor", [...rentals, values]);

    addItem(values);

    setOpen(false);
    navigate("/rentals");
  };

  React.useEffect(() => {
    const basePrice = new Date().getDate() < 15 ? 10 : 12;

    let strategy: RentalPriceStrategy;

    switch (type) {
      case "Electric":
        strategy = new ElectricBikeRentalPriceStrategy();
        break;
      case "Normal":
        strategy = new NormalBikeRentalPriceStrategy();
        break;
      case "Old":
        strategy = new OldBikeRentalPriceStrategy();
        break;
      default:
        throw new Error(`Unsupported bike type: ${type}`);
    }

    const total = strategy.calculatePrice(basePrice, days);
    setRentalPrice(total);
  }, [days]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched }) => (
        <>
          <div>
            <Field
              as={TextField}
              name="name"
              label="Nombre"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="email"
              label="Email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="phone"
              label="Teléfono"
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="date"
              type="date"
              label="Fecha"
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="days"
              type="number"
              label="Número de días"
              error={touched.days && Boolean(errors.days)}
              helperText={touched.days && errors.days}
              value={days}
              onChange={(event: any) => setDays(event.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            disabled={
              !values.name ||
              !values.email ||
              !values.phone ||
              !values.date ||
              !values.days
            }
          >
            Guardar
          </Button>

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Info"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Guargar los cambios.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button
                  onClick={() => onSubmit(values)}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Enviar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </Formik>
  );
};

export default FormRental;
