import * as React from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { BikeInfo } from "./components";
import { FormRental } from "./components";

const Rental = () => {
  const { state } = useLocation();

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
        <BikeInfo rentalPrice={rentalPrice} state={state} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormRental type={state.type} setRentalPrice={setRentalPrice} />
      </Grid>
    </Box>
  );
};

export default Rental;
