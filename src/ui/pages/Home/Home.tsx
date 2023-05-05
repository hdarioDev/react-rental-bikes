import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useBikes } from "../../hooks/useBike";
import { Avatar, Box, Button } from "@mui/material";
import { Bike } from "../../../entities/Bike";

const Home = () => {
  const { bikes } = useBikes();
  const navigate = useNavigate();

  const handleEvent = (data: Bike) => {
    navigate("/renta", { state: data });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
        marginBottom: "80px",
      }}
    >
      <TableContainer component={Paper} sx={{ width: "80%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#929292",
            }}
          >
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Bicicleta</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box
                    component="img"
                    alt={row.name}
                    src={row.image}
                    sx={{ width: 64, height: 64, borderRadius: 2 }}
                  />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEvent(row)} variant="text">
                    Alquilar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
