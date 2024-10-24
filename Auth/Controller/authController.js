const DataBase = require("../DBConfig")

module.exports.postSignup = async (req, res) => {
  try {
    console.log('post signup');
    const data = {
      name: req.body.name,
      password: req.body.password,
    }

    const existingUser = await DataBase.findOne({ name: data.name })
    if (existingUser) {
      return res.status(409).send({ message: 'User already exists' })
    }

    const user = await DataBase.create(data)
    console.log(user)
    return res.status(201).send({ message: 'User created', user })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Server error' })
  }
}

module.exports.postLogin = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      password: req.body.password,
    }
    const user = await DataBase.findOne(data)

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    return res.status(200).send({ message: 'Login successful', user })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Server error' })
  }
}