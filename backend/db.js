const mongoose = require('mongoose');
const password = process.env.PASSWORD;

const mongoURI = `mongodb+srv://rajusharma852000:${encodeURIComponent(password)}@backenddb.qbfyh78.mongodb.net/zcoder?retryWrites=true&w=majority&appName=BackendDB`;

const connectToMongo = async() =>{
    mongoose.connect(mongoURI)
    .then(()=>{console.log("Connected to Mongo data base")})
    .catch((error)=>{ console.log({message: error.message})})
    
};

module.exports = connectToMongo;