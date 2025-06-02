import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import axios from "axios";
axios.defaults.baseURL = "https://dev.dug-out.store";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
