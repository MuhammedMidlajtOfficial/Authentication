const express = require('express')
const app = express()
const {v4 : uuidv4} = require('uuid');
const session = require('express-session');
const nocache = require('nocache');
const authIndividualRouter = require('./Routes/Individual/authIndividualRouter')
const authEnterpriseRouter = require('./Routes/Enterprise/authEnterpriseRouter')

app.use(session({
  secret: uuidv4(),
  resave : false,
  saveUninitialized : true
}))
app.use(nocache());
app.use(express.json())

app.use('/individual/',authIndividualRouter)
app.use('/enterprise/',authEnterpriseRouter)

const port = process.env.PORT | "3000"
app.listen(port ,()=>{
  console.log(`Server Connected port : ${port}`);
})