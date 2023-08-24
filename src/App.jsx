import { Outlet, Route, Routes } from "react-router-dom";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import Navbar, { SmallNavbar } from "./components/main/navbar";
import { useState } from "react";
import Main from "./components/main/home";
import Search from "./components/search/search";

function App() {
  const [smallNav, setSmallNav] = useState(false);
  function toggleNav() {
    setSmallNav(!smallNav);
  }
  return (
    <>
      <div className="relative ph-size:max-w-screen-generalSize sm:max-w-none bg-slate-800">
        <Navbar toggleNav={toggleNav} />
        <Outlet />
      </div>
      <AnimatePresence>
        {smallNav && <SmallNavbar toggleNav={toggleNav} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
