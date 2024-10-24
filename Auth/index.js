const express = require('express')
const authRouter = require('./Routes/authRouter')
const app = express()

app.use(session({
  secret: uuidv4(),
  resave : false,
  saveUninitialized : true
}))
app.use(nocache());

app.use(express.json())
app.use('/',authRouter)

const port = process.env.PORT | "3000"
app.listen(port ,()=>{
  console.log(`Server Connected port : ${port}`);
})