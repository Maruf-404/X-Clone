import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./app/store..js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#E7E9EA",
    },
    teriatry: {
      main: "#1D98f0",
    },
    light: {
      main: "rgb(113, 118, 123)",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
