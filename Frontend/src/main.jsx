import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Apidata from "./Component/Contextapi/fetchapi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Apidata>
        <App />
      </Apidata>
    </BrowserRouter>
  </React.StrictMode>
);
