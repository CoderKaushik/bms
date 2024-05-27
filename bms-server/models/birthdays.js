import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const birthdaySchema = new Schema({
  name: { type: String, rquired: true },
  gender: { type: String, required: true },
  relation: { type: String, required: true },
  description: { type: String, required: false },
  dob: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const birthdayModel = model("birthdays", birthdaySchema);

export default birthdayModel;
