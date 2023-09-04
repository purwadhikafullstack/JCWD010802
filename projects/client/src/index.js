import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react"
import { routes } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(routes);

root.render(
  <ChakraProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ChakraProvider>
);

reportWebVitals();
