const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

authRouter.post("/register", async (req, res) => {
  // checking if the email already exists
  const nameExist = await User.findOne({ name: req.body.name });
  if (nameExist) return res.status(400).send("Name already exists");

  // encrypt the password
  const salt = await bcrypt.genSalt(10); // default is 10 rounds
  const hashPassword = await bcrypt.hash(req.body.password, salt); // adds salt to the end of the hashed password

  // create the user with the info provided by the user
  const user = new User({
    name: req.body.name,
    password: hashPassword,
  });
  user.save();
  res.send(`Welcome to our website ${user.name}`);
});

authRouter.post("/login", async (req, res) => {
  // Checking if the email provided by the user matches with one in the database
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Name not found, please register");

  // compare the password from the user (req.body.password) with the one (encrypted: user.password) in the database
  const validPass = await bcrypt.compare(req.body.password, user.password); // compares encrypted password that is in database
  if (!validPass)
    return res.status(400).send("Password is not valid, please try again !");

  // create a JWT token
  //if you pass {abc:user} as first parameter to jwt.sign method, it will create token with key 'abc'
  const token = jwt.sign(
    { user },
    "Stack",
    { expiresIn: "10h" },
    process.env.SECRET
  ); // create the token with key 'user' and sign the jwt. SECRET is an additional safety feature. This SECRET is created by JWT and sent to the user. it stays encrypted al
  res.header("auth-token", token); // we add the jwt in the res.header ("auth-token" is the key in the header, and "token (that we just created)" is the value )
  res.json(token);
  //  we send token in response, if we want to display the token info to user. (We could also say “res.send(“successfully logged in”)", for example)
});

module.exports = authRouter;
