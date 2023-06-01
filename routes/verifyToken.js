const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  // console.log(authHeader)
  if (authHeader) {
    jwt.verify(
      authHeader.split(" ")[[1]],
      process.env.JWT_SECRET_KEY,
      (err, user) => {
        if (err) res.status(403).json("token is not valid")
        // console.log(user)
        req.user = user
        next()
      }
    )
  } else {
    return res.status(401).json("Auhentication failed")
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user)
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not allowed to do this")
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not allowed to do that")
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
}
