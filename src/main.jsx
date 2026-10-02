import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../my-portfolio/portfolio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);