import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { StrictMode } from "react";
import { render } from "react-dom";

import App from "./App";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
