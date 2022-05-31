import React from "react";
import { StrictMode } from "react";
// @ts-ignore
import * as ReactDOMClient from "react-dom/client";

import App1 from "./Approach1/App";
import App2 from "./Approach2/App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App1 />
    <App2 />
  </StrictMode>
);
