import React from "react";
import { Link } from "react-router-dom";

const signout = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div className="h-screen w-screen p-0 m-0 bg-orange-400 flex justify-center items-center">
      <div className="w-[80%] h-[80%] bg-white rounded-2xl shadow-2xl flex justify-center items-center flex-col gap-[3rem]">
        <h1 className="text-3xl font-semibold">
          Are you sure you wish to Sign Out?
        </h1>
        <div className="w-[40%] h-auto flex justify-center items-center gap-8">
          <Link
            to="/home"
            className="w-1/2 h-[5rem] text-lg bg-blue-500 rounded-lg text-white hover:bg-blue-400"
          >
            <button className="w-full h-full flex justify-center items-center">
              Go Back
            </button>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-1/2 h-[5rem] text-lg bg-blue-500 rounded-lg text-white hover:bg-blue-400"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default signout;
