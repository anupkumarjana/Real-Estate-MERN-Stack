import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password } = req.body; // in this object we are getting the data
  const hashedPassword = bcrypt.hashSync(password, 10); //here we are encrypting the password
  const newUser = new User({ username, email, password: hashedPassword }); //we are storing the data in database

  try {
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (err) {
    res.status(500).json(err.message); //this is for if the username is not unique then its gonna throw error
  }
};