require('dotenv').config();

const mongoose = require('mongoose');

if (!process.env.MongoDBURL) {
  console.error("MongoDBURL environment variable is not defined.");
  process.exit(1);
}

mongoose.connect(process.env.MongoDBURL)
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error('DB Connection Failed:', err);
  });