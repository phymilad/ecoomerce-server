const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  })

  try {
    await newUser.save()
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
    return
  }

  res.status(201).json({ user: newUser })
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) res.status(401).json("Wrong Password")
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    )
    const pass = hashedPassword.toString(CryptoJS.enc.Utf8)
    if (pass !== req.body.password) res.status(401).json("Wrong Credentials")

    const { password, ...others } = user._doc
    console.log(others)
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
