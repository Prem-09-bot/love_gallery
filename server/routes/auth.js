const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register (run once)
router.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hash
  });

  await user.save();
  res.json("User created");
});

// Login
router.post("/login", async (req,res)=>{
  const user = await User.findOne({username: req.body.username});
  if(!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if(!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
  res.json({token});
});

module.exports = router;