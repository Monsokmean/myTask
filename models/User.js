const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");




const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid');
      }
    }
  },
  age:{
    type: Number,
    default: 0,
    validate(age){
      if(age < 0){
        throw new Error("Age must be positive number.");
      }
    }
  },
  password:{
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(password){
      if(password.toLowerCase().includes('password')){
        throw new Error("Password cannot contain 'password'.");
      }
    }
  }
},{
  timestamps: true,
});


userSchema.pre("save",async function(next){
  const user = this;
  if(user.isModified('password')||user.isNew){
    user.password = await bcrypt.hash(user.password,8);
  }
})

const User = mongoose.model('User',userSchema);
module.exports = User;
