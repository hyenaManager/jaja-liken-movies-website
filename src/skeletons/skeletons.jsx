import { motion } from "framer-motion";

export function ImgSkeleton() {
  return (
    <>
      <div className=" relative w-64 mr-4 h-96 rounded-lg bg-slate-400 overflow-hidden">
        <Flashing />
      </div>
    </>
  );
}
export default function SkeletonBar({ percent }) {
  return (
    <div
      className="relative rounded-lg bg-slate-400 overflow-hidden h-7 mt-1"
      style={{ width: percent }}
    >
      <Flashing />
    </div>
  );
}
export function SkeletonColumn({ percent }) {
  return (
    <div
      className="relative rounded-lg bg-slate-400 overflow-hidden h-7 m-1"
      style={{ height: percent }}
    >
      <Flashing />
    </div>
  );
}
export function SkeletonText() {
  return (
    <div className="relative overflow-hidden ">
      <div
        className=" rounded-lg bg-emerald-500 m-1 h-7"
        style={{ width: "800px" }}
      ></div>
      <div
        className=" rounded-lg bg-emerald-500 m-1 h-7"
        style={{ width: "800px" }}
      ></div>
      <div
        className=" rounded-lg bg-emerald-500 m-1 h-7"
        style={{ width: "600px" }}
      ></div>
      <div
        className=" rounded-lg bg-emerald-500 m-1 h-7"
        style={{ width: "200px" }}
      ></div>
      <Flashing />
    </div>
  );
}

function Flashing() {
  return (
    <>
      <motion.div
        initial={{ x: "-100vw", skewX: 2 }}
        animate={{ x: "100vw", skewX: 2 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className=" absolute w-full h-full top-0 left-0"
        style={{ backgroundColor: "rgb(203 ,213 ,220,0.2)" }}
      ></motion.div>
    </>
  );
}
