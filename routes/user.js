const router = require("express").Router()

router.get("/test", (req, res, next) => {
  res.send("User route test")
})

router.post("/test", (req, res, next) => {
  const { username } = req.body
  res.send(`username: ${username}`)
})

module.exports = router
