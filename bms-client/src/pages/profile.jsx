import React from "react";
import { Link } from "react-router-dom";

const profile = () => {
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
          <Link to="/profile">
            <h1 className="cursor-pointer underline text-lg">Profile</h1>
          </Link>
          <Link to="/signout">
            <h1 className="cursor-pointer">Sign Out</h1>
          </Link>
        </div>
      </div>
      <div className="body w-4/5 h-[35rem] rounded-2xl bg-white flex justify-center items-center">
        <div className="h-full w-1/2 border border-black flex justify-center items-center flex-col gap-4">
          <div className="w-[15rem] h-[15rem] rounded-full border border-black"></div>
          <h1 className="text-xl font-semibold">Hiteshwar Kaushik</h1>
        </div>
        <div className="h-full w-1/2 border border-black"></div>
      </div>
    </div>
  );
};

export default profile;
