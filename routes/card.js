const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken")
const Card = require("../models/Card")
const router = require("express").Router()

// // get a list of products
// router.get("/", async (req, res) => {
//   try {
//     const cards = await Card.find()
//     res.status(200).json(cards)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// create a card
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newCard = new Card(req.body)
  try {
    const savedCard = await newCard.save()
    res.status(200).json(savedCard)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update a card
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(201).json(updateCard)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a card
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id)
    res.status(201).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get user card
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const card = await Card.find({ userId: req.params.userId })
    res.status(200).json(card)
  } catch (err) {}
})

// Get all cards by admin
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cards = await Card.find()
    res.status(200).json(cards)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
