import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Add from "./pages/add.jsx";
import List from "./pages/list.jsx";
import Edit from "./pages/edit.jsx";
import Profile from "./pages/profile.jsx";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import SignOut from "./pages/signout.jsx";
import LandingPage from "./pages/landing.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
