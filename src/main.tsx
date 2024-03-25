import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //useEffectが2回実行されcardが2回作られるので、前のcardと新しいcardが同じか判別できないため一旦消した
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
