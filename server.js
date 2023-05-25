const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/user", userRoute)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((err) => console.log(err))

app.listen(process.env.PORT || 5001, () => {
  console.log("Backend is running")
})
