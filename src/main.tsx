import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.tsx";
import Navigation from "./components/Navigation.tsx";
import { ThemeProvider } from "@mui/material";

import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <div className="container-app">
          <Navigation />
          <App />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
