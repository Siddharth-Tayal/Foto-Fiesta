import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const MyDetailNav = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" sticky text-neutral-950 top-0 left-0 h-[10vh] bg-white shadow-sm  shadow-neutral-800 w-screen p-3 flex items-center justify-between md:w-[80vw]">
      <div className="  text-2xl font-serif font-thin ">
        Foto<span className="">Fiesta</span>
      </div>
      <div className=" hidden md:flex items-center justify-center gap-4 px-5">
        <Avatar src={currentUser && currentUser.avatar.url} />
        <div className=" flex flex-col items-center font-semibold justify-center gap-1 text-sm">
          <p className=" ">Followings :</p>
          <p>{currentUser && currentUser.following.length}</p>
        </div>{" "}
        <div className=" flex flex-col items-center font-semibold justify-center gap-1 text-sm">
          <p>Followers :</p>
          <p>{currentUser && currentUser.followers.length}</p>
        </div>
      </div>
    </div>
  );
};
export default MyDetailNav;
