require('dotenv').config()
const mongoose = require("mongoose");

const mongoURI =process.env.MONGO_URL

const connectToMongo = async()=>{
   await mongoose.connect(mongoURI);
   console.log("connected to mongodb successfuly")
}

module.exports = connectToMongo;