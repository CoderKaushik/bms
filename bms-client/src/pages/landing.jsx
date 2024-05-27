import React from "react";
import { Link } from "react-router-dom";

const landing = () => {
  return (
    <div className="w-screen h-screen bg-orange-400 p-8">
      <div className="h-full w-full text-center">
        <h1 className="w-full h-[8rem] text-9xl font-bold text-center">
          LANDING PAGE
        </h1>
        <Link to="/signin">
          <button className="w-auto h-auto p-4 bg-blue-500 hover:bg-blue-400 text-[2rem] text-center font-semibold text-white rounded-xl mt-[10rem] mr-[5rem]">
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-auto h-auto p-4 bg-blue-500 hover:bg-blue-400 text-[2rem] text-center font-semibold text-white rounded-xl">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default landing;
