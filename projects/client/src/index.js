import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react"
import { routes } from "./routes";
import { Provider } from "react-redux"
import { store } from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
  </ChakraProvider>
);

reportWebVitals();
