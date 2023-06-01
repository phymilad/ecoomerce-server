const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cardRoute = require("./routes/card")
const orderRoute = require("./routes/order")

dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/card", cardRoute)
app.use("/api/order", orderRoute)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((err) => console.log(err))

app.listen(process.env.PORT || 5001, () => {
  console.log("Backend is running")
})
