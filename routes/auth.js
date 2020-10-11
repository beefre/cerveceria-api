var express = require("express")
var jwt = require("jsonwebtoken")
var passport = require("passport")

var router = express.Router()

/* POST /login */
router.post("/login", function (req, res) {
    console.log('El body:',req.body)

   passport.authenticate("local", { session: false }, function (
    error,
    user,
    info
  ) {
    if (error || !user) {
        console.log('El error es: ',error)
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      })
    }

    var token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
    console.log(token)
    return res.json({ user, token })
  })(req, res)
})

module.exports = router
