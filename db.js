require('dotenv').config()
const mongoose = require("mongoose");

const connectToMongo = async()=>{
   try {
      await mongoose.connect('mongodb+srv://pankajmalankiyadev:3yMd64FRG7a79UDo@listing-db.fwy64.mongodb.net/listing?retryWrites=true&w=majority&appName=listing-db&tls=true', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Try to connect for 5 seconds
      });
      console.log("Connected to MongoDB successfully");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      setTimeout(connectToMongo, 5000); // Retry after 5 seconds
    }
}

module.exports = connectToMongo;