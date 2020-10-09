require("dotenv").config();
var passport = require("passport");
var passportJWT = require("passport-jwt");
var LocalStrategy = require("passport-local").Strategy;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt-nodejs');

const models = require("../db/models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
         const pas = models.User.validPassword(password)
        // console.log('el pass es: ',pas)
      return models.User.findOne({
        where: { email, password },
      })
        .then(function (user) {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }


  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return models.Users.findByPk(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
