const mongoose = require('mongoose');
require('@dotenvx/dotenvx').config({ path: '.env' });

const collectionName=process.env.CL_LOGIN

const loginSchema = new mongoose.Schema({
    _id:{type:String,required:true},
    username: { type: String, required: true,unique:true },
    email:{ type: String, required: true,unique:true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Owner','Bidder'], required: true }
},{
    timestamps: true,
    versionKey: false 
});

const login = mongoose.model(collectionName, loginSchema);
module.exports = login;

