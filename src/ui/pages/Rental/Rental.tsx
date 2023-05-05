import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  ElectricBikeRentalPriceStrategy,
  NormalBikeRentalPriceStrategy,
  OldBikeRentalPriceStrategy,
  RentalPriceStrategy,
} from "../../hooks/useRentalPriceCalculator";
import useLocalStorage from "../../hooks/useLocalStorage";

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

const Rental = () => {
  const [open, setOpen] = React.useState(false);
  const [todos, setTodos] = useLocalStorage("todos", []);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { state } = useLocation();
  const [days, setDays] = React.useState(1);

  const onSubmit = (values: FormValues) => {
    values.days = days;

    const updatedTodos = [...todos, values];

    setTodos(updatedTodos);
    setOpen(false);
    navigate("/rentals");
  };

  React.useEffect(() => {
    const basePrice = new Date().getDate() < 15 ? 10 : 12;

    let strategy: RentalPriceStrategy;

    switch (state.type) {
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
        throw new Error(`Unsupported bike type: ${state.type}`);
    }

    const total = strategy.calculatePrice(basePrice, days);
    setRentalPrice(total);
  }, [days]);

  const [rentalPrice, setRentalPrice] = React.useState<number | null>(null);

  return (
    <Box
      display="flex"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
      justifyContent="center"
    >
      <Grid item xs={12} sm={6} mr={10}>
        <List
          sx={{ width: "300px", maxWidth: 360, bgcolor: "gray" }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItem button>
            <ListItemText primary={`TIPO: ${state.type}`} />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary={`BICICLETA: ${state.name}`} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={`PRECIO: ${state.price}`} />
          </ListItem>
          <Divider light />
          <ListItem button>
            <Box
              component="img"
              alt={state.name}
              src={state.image}
              sx={{ width: 104, height: 104, borderRadius: 2 }}
            />{" "}
          </ListItem>
          <Divider light />

          <ListItem button>
            <ListItemText
              primary={`TOTAL:${JSON.stringify(
                JSON.stringify(rentalPrice, null, 2)
              )}`}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
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
                  <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                  </DialogTitle>
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
            </Form>
          )}
        </Formik>
      </Grid>
    </Box>
  );
};

export default Rental;
