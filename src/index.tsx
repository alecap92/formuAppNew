import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import store from "./contexts/store/Store";

const container = document.getElementById("root");
if (!container) {
  throw new Error("El contenedor root no fue encontrado");
}
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
