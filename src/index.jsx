import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./styles.css";

const app = document.querySelector("#app");
ReactDom.render(<App />, app);
