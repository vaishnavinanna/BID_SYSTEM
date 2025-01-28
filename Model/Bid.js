require('@dotenvx/dotenvx').config({ path: '../.env' });
const mongoose = require('mongoose');
const Bids = process.env.CL_BID;
const Users = process.env.CL_USER;

const bidderSchema = new mongoose.Schema(
  {
    bidderId: { type: String, ref: Users, required: true },
    bidAmount: { type: Number, required: true },
    bidDays: { type: Number, required: true },
  },
  { _id: false } 
);

const bidSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { 
      type: String, 
      ref: Users, 
      required: true 
    },
    bidName: { type: String },
    description: { type: String },
    cost: { type: Number, required: true },
    days: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    },
    createdBy: { type: String, default: 'Admin' },
    updatedBy: { type: String, default: 'Admin' },
    isDeleted: { type: Boolean, default: false },
    bidders: [bidderSchema] 
  },
  { timestamps: true }
);

const Bid = mongoose.model(Bids, bidSchema);
module.exports = Bid;
