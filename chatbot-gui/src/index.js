import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Apps/App";

// 使用 createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
