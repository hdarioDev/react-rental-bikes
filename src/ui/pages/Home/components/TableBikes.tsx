import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Bike } from "../../../../entities/Bike";
import { useBikes } from "../../../hooks/useBike";
import { useNavigate } from "react-router-dom";

const TableBikes = () => {
  const { bikes } = useBikes();
  const navigate = useNavigate();

  const handleEvent = (data: Bike) => {
    navigate("/renta", { state: data });
  };

  return (
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
        {bikes.map((row: Bike, index: number) => (
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
            <TableCell>{row.name}</TableCell>
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
  );
};

export default TableBikes;
