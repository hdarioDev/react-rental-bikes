import TableContainer from "@mui/material/TableContainer";

import Paper from "@mui/material/Paper";

import { Box } from "@mui/material";
import TableBikes from "./components/TableBikes";

const Home = () => {
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
        <TableBikes />
      </TableContainer>
    </Box>
  );
};

export default Home;
