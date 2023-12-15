const express = require('express');
const userRouter = require("./routers/user");
const app = express();



app.use(express.json());


//Middleware handles router
app.use(userRouter);



app.get("/",(req,res)=>{
  res.send("Home page");
})
app.get("*",(req,res)=>{
  res.send("This page is not found.");
})

module.exports = app;
