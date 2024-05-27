import React, { useState } from "react";
import signinimg from "../assets/signin.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/signin", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          // Store the token in localStorage
          localStorage.setItem("token", result.data.token);
          navigate("/home");
        } else {
          alert(result.data.message);
          if (result.data.message === "User doesn't exist, kindly sign up.") {
            navigate("/signup");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen h-screen bg-orange-400 flex justify-center items-center">
      <div className="w-[75%] h-[85%] border border-white rounded-2xl bg-white shadow-2xl flex">
        <div className="h-full w-1/2 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">
          <img src={signinimg} alt="" />
        </div>
        <div className="h-full w-1/2 rounded-tr-2xl rounded-br-2xl flex justify-center items-center">
          <div className="w-[90%] h-[80%] p-6">
            <h1 className="w-full text-5xl font-bold text-left mb-10">
              Sign In
            </h1>
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-semibold text-left mb-4">Email</h1>
              <input
                type="email"
                placeholder="email@gmail.com"
                className="w-[90%] p-2 text-gray-700 rounded-lg h-[3rem] mb-6 border-2 border-orange-400"
                required="true"
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1 className="text-2xl font-semibold text-left mb-4">
                Password
              </h1>
              <input
                type="password"
                placeholder="your password"
                className="w-[90%] p-2 text-gray-700 rounded-lg h-[3rem] mb-10 border-2 border-orange-400"
                required="true"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-2/5 h-[3rem] rounded-lg bg-orange-400 hover:bg-orange-300 text-lg text-white mb-6"
              >
                Submit
              </button>
              <p className="text-lg">
                Don't have an account?{" "}
                <span>
                  <Link
                    to="/signup"
                    className="text-orange-400 hover:text-orange-600"
                  >
                    Sign Up here
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

export default signin;
