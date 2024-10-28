import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./contexts/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

// Socket Provider
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <SocketProvider>
        <App />
      </SocketProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
