import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages";
import Erreur404 from "./pages/erreur404";
import Resource from "./pages/resource";
import Login from "./pages/login";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setHeaderHeight(document.querySelector("#header")?.clientHeight || 0);
  }, []);

  return (
    <div className="app" style={{ height: `calc(100vh - ${headerHeight}px)` }}>
      <Routes>
        <Route path="/citizens" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Resource />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        {/* <Route path="*" element={<Erreur404 />} /> */}
      </Routes>
    </div>
  );
}

export default App;
