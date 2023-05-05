// import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";
import { routes } from "../../navigation/routes";

const NavBar = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                My App
              </Typography>
              <Button color="inherit" component={Link} to="/home">
                Inicio
              </Button>
              <Button color="inherit" component={Link} to="/rentals">
                Alquileres
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          {routes.map(({ path, Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}
          <Route path="/" element={<Navigate to={routes[0].to} replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default NavBar;
