import { LazyExoticComponent } from "react";
import { Home, Rental, Rentals } from "../pages";
// import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  name: string;
  Component: LazyExoticComponent<() => JSX.Element> | JSXComponent;
}

export const routes: Route[] = [
  //   {
  //     to: "/LazyLayout/*",
  //     path: "/LazyLayout/*",
  //     Component: Home,
  //     name: "Lazy Layout - Dash",
  //   },
  {
    to: "/home",
    path: "home",
    Component: Home,
    name: "Home",
  },
  {
    to: "/renta",
    path: "renta",
    Component: Rental,
    name: "Alquilar",
  },
  {
    to: "/rentals",
    path: "rentals",
    Component: Rentals,
    name: "Alquileres",
  },
];
