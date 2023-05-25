const { default: mongoose } = require("mongoose")
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String, default: false },
    categories: { type: Array },
    size: { type: String, default: false },
    color: { type: String, default: false },
    price: { type: Number, default: false },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Product", ProductSchema)
