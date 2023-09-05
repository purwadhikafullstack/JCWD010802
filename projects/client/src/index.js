import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react"
import { routes } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux"
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(routes);

root.render(
  <ChakraProvider>
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
  </ChakraProvider>
);

reportWebVitals();
