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


const { MongoClient } = require ("mongodb");
const dotenv = require ("dotenv");

dotenv.config();
app.use(express.json({ limit: "10mb" }));

const uri = process.env.MongoDBURL || "";
const client = new MongoClient(uri);

app.get("/api/profile", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("diskuss");
    const collection = database.collection("profile");
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Failed to get", error });
  } finally {
    await client.close();
  }
});

app.post("/api/profile", async (req, res) => {
  const {
    businessName,
    yourName,
    designation,
    mobile,
    email,
    location,
    services,
    image,
    position,
    color,
  } = req.body;

  try {
    await client.connect();
    const database = client.db("diskuss");
    const collection = database.collection("profile");

    const newEntry = {
      businessName,
      yourName,
      designation,
      mobile,
      email,
      location,
      services,
      image,
      position,
      color,
    };

    const result = await collection.insertOne(newEntry);
    res.json({
      message: "Entry added successfully",
      entryId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add entry", error });
  } finally {
    await client.close();
  }
});

const port = process.env.PORT | "3000"
app.listen(port ,()=>{
  console.log(`Server Connected port : ${port}`);
})