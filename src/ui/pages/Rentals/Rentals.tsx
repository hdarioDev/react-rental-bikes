import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const Rentals = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);

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
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Dias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((row: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Rentals;
