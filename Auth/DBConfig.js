require('dotenv').config();

const mongoose = require('mongoose')
const connect = mongoose.connect(process.env.MongoDBURL)

connect.then(()=>{
  console.log('DB Connected');
}).catch((err)=>{
  console.log(err);
  console.log('DB Connection Failed');
})

const userSchema = new mongoose.Schema({
  email:{
    type : String,
    required : true
  },
  password:{
    type : String,
    required : true
  },
})

const DataBase = mongoose.model('user',userSchema)
module.exports = DataBase