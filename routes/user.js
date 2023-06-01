const router = require("express").Router()
const CryptoJS = require("crypto-js")
const User = require("../models/User")
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken")

// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new
  try {
    const users = !!query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json("There is a problem in server")
  }
})

// Get user by id
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    console.log("user", user)
    const { password, ...others } = user
    console.log("password", password)
    console.log("others", others)
    res.status(200).json(others._doc)
  } catch (err) {
    res.status(500).json("cannot find this user")
  }
})

// Update a user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString()
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(201).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a user
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
