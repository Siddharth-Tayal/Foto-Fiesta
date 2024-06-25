import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
const User = ({ userId, name, avatar }) => {
  return (
    <Link
      to={`/user/${userId}`}
      className="flex flex-wrap max-w-[320px] w-full items-center justify-start p-3 gap-4 bg-white rounded-lg duration-300 hover:bg-slate-200 hover:shadow-sm"
    >
      <Avatar src={avatar} className=" w-[40%] bg-black" />
      <p className=" whitespace-nowrap font-semibold text-slate-900 w-[60%] text-center">
        {name}
      </p>
    </Link>
  );
};

export default User;
