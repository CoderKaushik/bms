import React, { useState } from "react";
import signupimg from "../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/signup", {
        userName,
        email,
        password,
        dob,
      })
      .then((result) => {
        console.log(result);
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen h-screen bg-orange-400 flex justify-center items-center">
      <div className="w-[75%] h-[85%] border border-white rounded-2xl bg-white shadow-2xl flex">
        <div className="h-full w-1/2 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">
          <img src={signupimg} alt="" />
        </div>
        <div className="h-full w-1/2 rounded-tr-2xl rounded-br-2xl flex justify-center items-center">
          <div className="w-[90%] h-[80%]">
            <h1 className="w-full text-5xl font-bold text-left mb-4">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-semibold text-left mb-2">Name</h1>
              <input
                type="text"
                placeholder="John Doe"
                className="w-[90%] p-2 text-gray-700 rounded-lg h-[2.5rem] mb-2 border-2 border-orange-400"
                required="true"
                onChange={(e) => setUserName(e.target.value)}
              />
              <h1 className="text-2xl font-semibold text-left mb-2">Email</h1>
              <input
                type="email"
                placeholder="email@gmail.com"
                className="w-[90%] p-2 text-gray-700 rounded-lg h-[2.5rem] mb-2 border-2 border-orange-400"
                required="true"
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1 className="text-2xl font-semibold text-left mb-2">
                Set Password
              </h1>
              <input
                type="password"
                placeholder="your password"
                className="w-[90%] p-2 text-gray-700 rounded-lg h-[2.5rem] mb-2 border-2 border-orange-400"
                required="true"
                onChange={(e) => setPassword(e.target.value)}
              />
              <h1 className="text-2xl font-semibold text-left mb-2">
                Your Birthday
              </h1>
              <input
                type="date"
                placeholder="your birthday"
                className="w-[90%] p-2 text-gray-700 rounded-lg h-[2.5rem] mb-4 border-2 border-orange-400"
                required="true"
                onChange={(e) => setDob(e.target.value)}
              />
              <button
                type="submit"
                className="w-2/5 h-[2.5rem] rounded-lg bg-orange-400 hover:bg-orange-300 text-lg text-white mb-6"
              >
                Submit
              </button>
              <p className="text-lg">
                Already have an account?{" "}
                <span>
                  <Link
                    to="/signin"
                    className="text-orange-400 hover:text-orange-600"
                  >
                    Sign In here
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
