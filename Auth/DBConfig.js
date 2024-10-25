require('dotenv').config();

const mongoose = require('mongoose')
const connect = mongoose.connect(process.env.MongoDBURL)

connect.then(()=>{
  console.log('DB Connected');
}).catch((err)=>{
  console.log(err);
  console.log('DB Connection Failed');
})

const individualUserSchema = new mongoose.Schema({
  username:{
    type : String,
    required : true
  },
  email:{
    type : String,
    required : true
  },
  password:{
    type : String,
    required : true
  },
})

module.exports.individualUserCollection = mongoose.model('user',individualUserSchema)