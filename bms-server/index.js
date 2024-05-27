import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "./models/user.js";
import bcrypt from "bcrypt";
import birthdayModel from "./models/birthdays.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const jwtSecret = process.env.JWT_SECRET;

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://thehiteshwarkaushik:waM88SCrW7EE6sfV@cluster0.tutyrpb.mongodb.net/"
  );
  console.log("DB Connected");
};

connectDB();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
};

// app.post("/api/signin", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (user) {
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (isPasswordValid) {
//         const token = generateToken(user);
//         res.json({ message: "Success", token });
//       } else {
//         res.json({ message: "The password is incorrect" });
//       }
//     } else {
//       res.json({ message: "User doesn't exist, kindly sign up." });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      if (password === user.password) {
        const token = generateToken(user);
        res.json({ message: "Success", token });
      } else {
        res.json({ message: "The password is incorrect" });
      }
    } else {
      res.json({ message: "User doesn't exist, kindly sign up." });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
};

// app.post("/api/signup", async (req, res) => {
//   try {
//     const { email, password, dob, userName } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await userModel.create({
//       email,
//       password: hashedPassword,
//       userName,
//       dob,
//     });
//     res.json(newUser);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error in creating user", error: error.message });
//   }
// });

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, dob, userName } = req.body;
    const newUser = await userModel.create({
      email,
      password, // Storing plaintext password
      userName,
      dob,
    });
    res.json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in creating user", error: error.message });
  }
});

// app.post("/api/addbirthday", verifyToken, (req, res) => {
//   try {
//     const newBirthday = new birthdayModel({
//       ...req.body,
//       user: req.userId,
//     });
//     newBirthday.save((err, birthday) => {
//       if (err) {
//         res.status(500).json({ message: "Error saving birthday", error: err });
//       } else {
//         res.status(201).json(birthday);
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error: error });
//   }
// });

app.post("/api/addbirthday", verifyToken, async (req, res) => {
  try {
    // Extract data from request body
    const { name, dob, gender, description, relation } = req.body;

    // Create a new birthday instance
    const newBirthday = new birthdayModel({
      name,
      dob,
      gender,
      description,
      relation,
      user: req.userId, // Assign the user ID from the JWT token
    });

    // Save the new birthday to the database
    const savedBirthday = await newBirthday.save();

    // Respond with the saved birthday data
    res.status(201).json(savedBirthday);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding birthday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/listbirthdays", verifyToken, async (req, res) => {
  try {
    const birthdays = await birthdayModel.find({ user: req.userId });
    res.json({ success: true, data: birthdays });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

//route to edit birthdays
app.put("/api/editbirthday/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, relation, description, dob } = req.body;
    //Find the birthday by id and update it's data
    const updatedBirthday = await birthdayModel.findOneAndUpdate(
      { _id: id, user: req.userId },
      { name, dob, gender, relation, description },
      { new: true }
    );

    if (!updatedBirthday) {
      return res.status(404).json({ message: "Birthday not found" });
    }

    res.json(updatedBirthday);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating birthday " });
  }
});

//function to delete birthdays data
app.delete("/api/deletebirthday/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    //Find the birthday by id and user, then delete it
    const deletedBirthday = await birthdayModel.findOneAndDelete({
      _id: id,
      user: req.userId,
    });
    if (!deletedBirthday) {
      return res.status(404).json({ message: "Birthday not found" });
    }

    res.json({ message: "Birthday deleted succesfully", deletedBirthday });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting birthday" });
  }
});

//sign out code
app.post("/api/signout", (req, res) => {
  // For JWT tokens, there's no direct logout mechanism.
  // Instead, the client-side should remove the JWT token, effectively "logging out" the user.
  res.json({ message: "User successfully signed out" });
});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
