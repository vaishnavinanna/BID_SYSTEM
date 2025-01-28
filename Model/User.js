require('@dotenvx/dotenvx').config({ path: '../.env' });
const mongoose = require('mongoose');
const Users = process.env.CL_USER;

const userSchema = new mongoose.Schema(
  {
    _id: { type: String }, 
    name: { type: String, required: true,unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Owner', 'Bidder'], required: true },
    createdBy: { type: String, default: 'Admin' },
    updatedBy: { type: String, default: 'Admin' },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model(Users, userSchema);
module.exports = User;
