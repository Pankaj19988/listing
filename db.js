require('dotenv').config()
const mongoose = require("mongoose");

const mongoURI =process.env.MONGO_URL

const connectToMongo = async()=>{
   await mongoose.connect('mongodb+srv://pankajmalankiyadev:3yMd64FRG7a79UDo@listing-db.fwy64.mongodb.net/listing?retryWrites=true&w=majority&appName=listing-db');
   console.log("connected to mongodb successfuly")
}

module.exports = connectToMongo;