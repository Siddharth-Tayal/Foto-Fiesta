import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";

const Header = () => {
  const [page, setPage] = useState(window.location.pathname);
  useEffect(() => {}, [page]);
  return (
    <div className=" shadow-md shadow-zinc-800 p-3  w-screen flex items-center justify-evenly py-5 text-2xl fixed bottom-0 z-50 bg-white h-[10vh]">
      <Link
        to={"/"}
        className="hover:text-3xl hover:text-slate-800 text-slate-700 duration-300"
        onClick={() => setPage("/")}
      >
        {page === "/" ? <AiFillHome /> : <AiOutlineHome />}
      </Link>
      <Link
        to={"/newpost"}
        className="hover:text-3xl hover:text-slate-800 text-slate-700 duration-300"
        onClick={() => setPage("/newpost")}
      >
        {page === "/newpost" ? <IoIosAddCircle /> : <IoIosAddCircleOutline />}
      </Link>
      <Link
        to={"/search"}
        className="hover:text-3xl hover:text-slate-800 text-slate-700 duration-300"
        onClick={() => setPage("/search")}
      >
        {page === "/search" ? <RiSearch2Fill /> : <RiSearch2Line />}
      </Link>
      <Link
        to={"/account"}
        className="hover:text-3xl hover:text-slate-800 text-slate-700 duration-300"
        onClick={() => setPage("/account")}
      >
        {page === "/account" ? <FaUserCircle /> : <FaRegUserCircle />}
      </Link>
    </div>
  );
};

export default Header;
