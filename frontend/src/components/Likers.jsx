import React from "react";
import { Link } from "react-router-dom";
import User from "./User";

const Likers = ({ likes = [] }) => {
  return (
    <div>
      <h2>Liked by :</h2>
      {likes.map((item, index) => (
        <User
          key={index}
          name={item.name}
          userId={item._id}
          avatar={item.avatar.url}
        />
      ))}
    </div>
  );
};

export default Likers;
