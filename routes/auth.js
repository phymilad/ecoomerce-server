const router = require("express").Router()
const User = require("../models/User")

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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

module.exports = router
