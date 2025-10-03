import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/EditMessage.css";
import "./Styles/MessagesForm.css";
import "./Styles/MessageList.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
