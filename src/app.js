// const express=require('express');
// const path=require('path')
// const dotenv=require('@dotenvx/dotenvx')
// const {connectDB}=require('../Config/connection')

// const baseRouter=require('../Routes/Router')
// dotenv.config({path:'../.env'})

// const app=express();

// app.use(express.json())

// const PORT=process.env.PORT

// connectDB();

// app.use(express.static(path.join(__dirname, '../Public')));

// app.use('/BidApplication',baseRouter)

// app.listen(PORT,'0.0.0.0',()=>{
//     console.log("Server is running on port ",PORT);
// })

const express = require('express');
const path = require('path');
const dotenv = require('@dotenvx/dotenvx'); 
const { connectDB } = require('../Config/connection');

const baseRouter = require('../Routes/Router');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.static(path.join(__dirname, '../Public')));

app.use('/BidApplication', baseRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
