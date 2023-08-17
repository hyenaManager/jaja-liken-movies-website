import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/main/home";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import Navbar, { SmallNavbar } from "./components/main/navbar";
import { useState } from "react";
import TrailerVideo from "./components/main/trailerVideo";

function App() {
  const [smallNav, setSmallNav] = useState(false);
  function toggleNav() {
    setSmallNav(!smallNav);
  }
  return (
    <>
      <div className="relative ph-size:max-w-screen-generalSize sm:max-w-none">
        <Navbar toggleNav={toggleNav} />
        <Outlet />
      </div>
      <AnimatePresence>
        {smallNav && <SmallNavbar toggleNav={toggleNav} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
