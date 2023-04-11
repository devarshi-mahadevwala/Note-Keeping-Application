const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://dev:dev123@cluster0.yhqobxs.mongodb.net/iNotebook"
const connectToMongo = async () =>{
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully")
}

module.exports = connectToMongo