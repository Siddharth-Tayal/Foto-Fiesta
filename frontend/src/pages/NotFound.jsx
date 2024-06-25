import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="md:flex absolute bg-white w-screen
      flex items-center justify-center flex-col gap-4 
     h-[90vh] top-[0] bottom-[10vh]"
    >
      <RiErrorWarningLine className=" text-6xl" />
      <p className=" text-6xl">Page Not Found</p>
      <Link
        to={"/"}
        className=" my-3 rounded-lg hover:placeholder-opacity-80 p-3 text-2xl text-slate-500 font-light"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
