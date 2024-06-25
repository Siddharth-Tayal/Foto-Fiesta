import React from "react";
import User from "./User";
import { useSelector } from "react-redux";

const SuggestionListLarge = () => {
  const { allUsers } = useSelector((state) => state.user);
  return (
    <div className="p-3 flex flex-col items-center backdrop-blur-3xl bg-white justify-start border-t-2 md:border-t-0  md:border-l-2 border-neutral-800 w-screen mb-[10vh]  md:w-[20vw] gap-6 md:fixed md:right-0 md:top-0 h-auto  md:h-[90vh] overflow-x-auto md:overflow-y-auto py-9">
      <h1 className=" font-extralight dtext-xl text-center">Suggestions :</h1>
      <div className="flex md:flex-col gap-6 w-full overflow-x-auto md:overflow-y-auto">
        {allUsers &&
          allUsers.map((item, index) => (
            <User
              key={index}
              name={item.name}
              userId={item._id}
              avatar={item.avatar.url}
            />
          ))}
      </div>
    </div>
  );
};

export default SuggestionListLarge;
