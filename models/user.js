const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: { 
      type: String, 
      required: true 
    }, // first_name: String,

    last_name: {
      type: String 
    }, // last_name: String,
    
    email: {
      type: String,
      required: true,
      unique: true 
    }, // email: String,
    
    gender: { type: String }, // gender: String,
    
    job_title: { type: String }, // job_title: String,
    ip_address: String,
    id: Number,
  },
  { timestamps: true }
);


// Model
const User = mongoose.model("user", userSchema);
module.exports = User;