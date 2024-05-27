import React from "react";
import { Link } from "react-router-dom";

const edit = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-6 bg-orange-400 justify-center items-center">
      <div className="navbar w-4/5 h-[4rem] rounded-2xl bg-white p-2 flex">
        <div className="h-full w-1/6 logo border border-black flex justify-center items-center">
          <Link to="/home">
            <h1 className="font-bold cursor-pointer">HBD</h1>
          </Link>
        </div>
        <div className="h-full w-5/6 logo border border-black flex justify-evenly items-center">
          <Link to="/add">
            <h1 className="cursor-pointer">Add</h1>
          </Link>
          <Link to="/list">
            <h1 className="cursor-pointer">List</h1>
          </Link>
          <Link to="/edit">
            <h1 className="cursor-pointer">Edit</h1>
          </Link>
          <Link to="/profile">
            <h1 className="cursor-pointer">Profile</h1>
          </Link>
          <Link to="/signout">
            <h1 className="cursor-pointer">Sign Out</h1>
          </Link>
        </div>
      </div>
      <div className="body w-4/5 h-[35rem] rounded-2xl bg-white flex justify-center items-center">
        <h2 className="text-gray-300">Please select an option to continue.</h2>
      </div>
    </div>
  );
};

export default edit;
