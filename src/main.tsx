import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/header.tsx";
import Navigation from "./components/navigation.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";

// Crée un wrapper pour utiliser useLocation ici
function AppWithLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="container-app">
        {!isLoginPage && <Navigation />}
        <App />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AppWithLayout />
    </BrowserRouter>
  </ThemeProvider>
  // </StrictMode>
);
