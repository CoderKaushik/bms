import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const birthdaySchema = new Schema({
// //  name: { type: String, rquired: true },
//   gender: { type: String, required: true }, //
// //  relation: { type: String, required: true },
//   description: { type: String, required: false }, //
// //  dob: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// });

const add = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post(
        "http://localhost:3001/api/addbirthday",
        {
          name,
          gender,
          relation,
          description,
          dob,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          alert("Addition successful!");
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => console.log(err));
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
            <h1 className="cursor-pointer underline text-lg">Add</h1>
          </Link>
          <Link to="/list">
            <h1 className="cursor-pointer">List</h1>
          </Link>
          <Link to="/profile">
            <h1 className="cursor-pointer">Profile</h1>
          </Link>
          <Link to="/signout">
            <h1 className="cursor-pointer">Sign Out</h1>
          </Link>
        </div>
      </div>
      <div className="body w-4/5 h-[35rem] rounded-2xl bg-white flex justify-center items-center p-12">
        <form
          onSubmit={handleSubmit}
          className="h-full w-5/6 flex justify-center items-center"
        >
          <div className="h-full w-1/2 border-r border-black">
            <h1 className="text-2xl font-semibold text-left mb-4">Name</h1>
            <input
              type="text"
              placeholder="John Doe"
              className="w-[90%] p-2 text-gray-700 rounded-lg h-[3rem] mb-6 border-2 border-orange-400"
              required="true"
              onChange={(e) => setName(e.target.value)}
            />
            <h1 className="text-2xl font-semibold text-left mb-4">
              Birth Date
            </h1>
            <input
              type="date"
              placeholder="01/01/2024"
              className="w-[90%] p-2 text-gray-700 rounded-lg h-[3rem] mb-6 border-2 border-orange-400"
              required="true"
              onChange={(e) => setDob(e.target.value)}
            />
            <h1 className="text-2xl font-semibold text-left mb-4">Gender</h1>
            <select
              id="relation"
              name="relation"
              className="w-[90%] p-2 text-gray-700 rounded-lg h-[3rem] mb-6 border-2 border-orange-400"
              required="true"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="family">Male</option>
              <option value="pookie">Female</option>
              <option value="friend">Others</option>
            </select>
            <h1 className="text-2xl font-semibold text-left mb-4">Relation</h1>
            <select
              id="relation"
              name="relation"
              className="w-[90%] p-2 text-gray-700 rounded-lg h-[3rem] mb-6 border-2 border-orange-400"
              required="true"
              onChange={(e) => setRelation(e.target.value)}
            >
              <option value="family">Family</option>
              <option value="pookie">Pookie</option>
              <option value="friend">Friend</option>
              <option value="relative">Relative</option>
              <option value="coworker">Co-Worker</option>
              <option value="boss">Boss</option>
            </select>
          </div>
          <div className="h-full w-1/2 border-l border-black p-4 flex flex-col gap-8 items-center justify-center">
            <textarea
              type="text"
              className="border-2 border-orange-400 resize-none w-[90%] h-3/4 rounded-xl p-2 overflow-auto"
              placeholder="Additional points..."
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="w-2/5 h-[3rem] rounded-lg bg-orange-400 hover:bg-orange-300 text-lg text-white mb-6"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default add;
