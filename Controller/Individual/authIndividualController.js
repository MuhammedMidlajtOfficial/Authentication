const DataBase = require("../../DBConfig")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.getIndividualLogin = (req, res) => {
  try {
    const user = req.session.user
    if (user) {
      return res.status(200).json({ message: 'User is logged in', user });
    } else {
      return res.status(401).json({ message: 'User not logged in' });
    }
  } catch (error) {
    console.error('Error checking login status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports.postIndividualLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await DataBase.individualUserCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user._id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    req.session.user = user

    return res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports.postIndividualSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: 'Username, email, and password are required' });
    }

    const existingUser = await DataBase.individualUserCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await DataBase.individualUserCollection.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(user);
    return res.status(201).send({ message: 'User created', user: { id: user._id, username, email } });
    
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).send({ message: 'Server error' });
  }
};
