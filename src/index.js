import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

if (window.location.pathname === '/') {
  window.location.assign('/SFM-Reference');
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="SFM-Reference">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
