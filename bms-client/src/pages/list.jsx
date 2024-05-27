import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const list = () => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const API_URL = "http://localhost:3001/api/listbirthdays";

  const fetchBirthdays = async () => {
    const token = localStorage.getItem("token");

    // Remove "Bearer " prefix from the token
    const tokenWithoutBearer = token.replace("Bearer ", "");
    // console.log("Retrieved token without bearer:", tokenWithoutBearer);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          Authorization: `Bearer ${tokenWithoutBearer}`,
        },
      });

      setBirthdays(response.data.data);
    } catch (error) {
      console.log("Error fetching birthdays : ", error);
      throw error;
    }
  };

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
            <h1 className="cursor-pointer underline text-lg">List</h1>
          </Link>
          <Link to="/profile">
            <h1 className="cursor-pointer">Profile</h1>
          </Link>
          <Link to="/signout">
            <h1 className="cursor-pointer">Sign Out</h1>
          </Link>
        </div>
      </div>
      <div className="body w-4/5 h-[35rem] rounded-2xl bg-white flex flex-col items-center p-8 overflow-y-auto">
        {/* searchbar */}
        <div className="w-[95%] h-[3rem] border border-gray-800 mb-4 rounded-2xl flex">
          <div className=" flex-grow h-full flex items-center p-1 rounded-2xl">
            <div className="w-full h-full rounded-2xl">
              <input
                type="text"
                className="w-full h-full p-1 rounded-2xl"
                style={{ outline: "none" }}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="w-[3rem] h-full flex justify-center items-center">
            <CiSearch className="text-2xl cursor-pointer" />
          </div>
        </div>
        {/* Here's what the list item looks like */}
        {birthdays.map((birthday) => (
          <div
            key={birthday._id}
            className="w-[95%] h-[4rem] border-b border-gray-800 bg-gray-100 mb-2 flex"
          >
            <div className="w-1/5 h-full flex justify-center p-2 items-center">
              <div className="h-[3rem] w-[3rem] rounded-full bg-gray-400"></div>
            </div>
            <div className="w-1/5 h-full flex justify-center p-2 items-center">
              <h2>{birthday.name}</h2>
            </div>
            <div className="w-1/5 h-full flex justify-center p-2 items-center">
              <h2>{birthday.relation}</h2>
            </div>
            <div className="w-1/5 h-full flex justify-center p-2 items-center">
              <h2>{birthday.dob}</h2>
            </div>
            <div className="w-1/5 h-full flex justify-center gap-12 p-2 items-center">
              <h2 className="cursor-pointer">Edit</h2>
              <h2 className="cursor-pointer">X</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default list;
