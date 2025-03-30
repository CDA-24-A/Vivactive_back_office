import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";
import { Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Index from "./pages";
import Erreur404 from "./pages/erreur404";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Erreur404 />} />
      </Routes>
    </>
  );
}

export default App;
