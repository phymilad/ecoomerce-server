const router = require("express").Router()
const CryptoJS = require("crypto-js")
const User = require("../models/User")
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken")

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json("There is a problem in server")
  }
})

// Get user by id
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user
    res.status(200).json(...others)
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
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(201).json("User has been deleted successfully")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
