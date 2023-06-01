const { verifyTokenAndAdmin } = require("./verifyToken")
const Product = require("../models/Product")
const router = require("express").Router()

// get a list of products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create a product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  // const { title, description, img, categories, size, color, price } =
  const newProduct = new Product(req.body)
  console.log(newProduct)
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update a Product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString()
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(201).json(updateProduct)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
