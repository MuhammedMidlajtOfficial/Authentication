require('dotenv').config();

const mongoose = require('mongoose');

if (!process.env.MongoDBURL) {
  console.error("MongoDBURL environment variable is not defined.");
  process.exit(1);
}

mongoose.connect(process.env.MongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error('DB Connection Failed:', err);
  });

const individualUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports.individualUserCollection = mongoose.model('user', individualUserSchema);
