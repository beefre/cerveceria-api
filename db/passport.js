require("dotenv").config();
var passport = require("passport");
var passportJWT = require("passport-jwt");
var LocalStrategy = require("passport-local").Strategy;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

const models = require("../db/models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email,password, done)=>{
      try {
        const user = await models.User.findOne({where: {email}})
        if (!user.validPassword(password)){
          return done(null,false, {
            message:'Password incorrecto'
          })
        }
        return done(null, user)
      } catch (error) {
        return done(null,false, {
          message:'Esa cuenta no existe'
        })
        
      }
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
      return models.User.findByPk(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    const userInformation = {
      username: user.email,
    };
    cb(err, userInformation);
  });
});

module.exports = passport;
