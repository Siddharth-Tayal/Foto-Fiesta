import React, { useState } from "react";
import { useSelector } from "react-redux";
import User from "../components/User";
import Loader from "../components/Loader";

const SearchPage = () => {
  const { allUsers, loading } = useSelector((state) => state.user);
  const [searchData, setSearchData] = useState("");
  if (loading) return <Loader />;
  return (
    <div className=" h-screen flex items-center justify-center w-screen fixed top-0 left-0 bg-white">
      <div className=" w-[60%] flex flex-col gap-2 items-center justify-end">
        <input
          type="text"
          className=" p-3 w-full rounded-lg text-2xl border-2 outline-none"
          placeholder="Search here..."
          onChange={(e) => setSearchData(e.target.value)}
        />
        <div className="flex flex-wrap items-center justify-evenly gap-4 max-h-[50vh] p-3 overflow-y-scroll w-full bg-white shadow-lg rounded-lg">
          {allUsers &&
          allUsers.filter((element) => {
            if (searchData === "") return element;
            else
              return element.name
                .toLowerCase()
                .includes(searchData.toLowerCase());
          }).length === 0 ? (
            <h1>No user found...</h1>
          ) : (
            allUsers
              .filter((element) => {
                if (searchData === "") return element;
                else
                  return element.name
                    .toLowerCase()
                    .includes(searchData.toLowerCase());
              })
              .map((item, index) => (
                <User
                  key={index}
                  name={item.name}
                  userId={item._id}
                  avatar={item.avatar.url}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
