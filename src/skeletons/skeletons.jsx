import { motion } from "framer-motion";

export function ImgSkeleton() {
  return (
    <>
      <div className=" relative w-64 mr-4 h-full rounded-lg bg-slate-400 overflow-hidden">
        <Flashing />
      </div>
    </>
  );
}
export default function SkeletonBar({ percent, color = "bg-slate-400" }) {
  return (
    <div
      className={`relative rounded-lg ${color} overflow-hidden h-7 mt-1`}
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
