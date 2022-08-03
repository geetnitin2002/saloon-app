import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import "./styles/steps.css";
import "./assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "./assets/fonts/iconic/css/material-design-iconic-font.min.css";
import "./assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./styles/loader.css";
import App from "./App";
import store from "./common/store/store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
