import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SocketProvider } from "./contexts/SocketContext";
import { GameContextProvider } from "./contexts/GameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </SocketProvider>
  </React.StrictMode>
);
