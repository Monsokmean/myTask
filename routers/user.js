const express = require("express");
const router = new express.Router();
require('../db/mongoose');
const User = require("../models/User");

//Create user
router.post('/users',async(req,res)=>{
  const user = new User(req.body);
  try{
    await user.save();
    res.status(201).send({
      user
    })
  }catch(e){
    res.status(500).send(`Created user error: ${e.message}`);
  }
})
//Get user
router.get('/users',async(req,res)=>{
  User.find({}).then((users)=>{
    if(!users){
      res.status(204).send('User is not found');
    }
    res.status(200).send({users});
  }).catch((error)=>{res.status(404).send(error.message)});
});
//update user
router.patch('/users/me',async(req,res)=>{
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name','age'];
  // const isValidOperation = up
  console.log(updates);
  res.send(updates);
});
//Unavailable route
router.get("/users/*",(req,res)=>{
  res.status(404).send("Sorry, this page does not exit");
})

module.exports = router;
