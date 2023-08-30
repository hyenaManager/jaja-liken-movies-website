import { Outlet, Route, Routes } from "react-router-dom";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import { SmallNavbar } from "./components/main/navbar";
import { Suspense, lazy, useState } from "react";

const Main = lazy(() => import("./components/main/home"));
const Search = lazy(() => import("./components/search/search"));
const Detail = lazy(() => import("./components/search/detail"));
const Navbar = lazy(() => import("./components/main/navbar"));
function App() {
  const [smallNav, setSmallNav] = useState(false);
  const [defaultSearchText, setDefaultSearchText] = useState("avenger");
  function toggleNav() {
    setSmallNav(!smallNav);
  }
  console.log("change to ", defaultSearchText);
  return (
    <>
      <div className="relative ph-size:max-w-screen-generalSize sm:max-w-none bg-slate-800 ">
        <Navbar toggleNav={toggleNav} />
        <Outlet />
      </div>
      <AnimatePresence>
        {smallNav && <SmallNavbar toggleNav={toggleNav} />}
      </AnimatePresence>

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <Main />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<div>Loading......</div>}>
              <Search
                defaultSearchText={defaultSearchText}
                changeDefaultSearchText={setDefaultSearchText}
              />
            </Suspense>
          }
        />
        <Route
          path="/search/:movieId"
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <Detail />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
