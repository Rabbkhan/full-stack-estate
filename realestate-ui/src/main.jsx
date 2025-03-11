import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketConnection.jsx";
import { ChatModalProvider } from "./context/ChatModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <ChatModalProvider>
          <App />
        </ChatModalProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
