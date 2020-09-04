var express = require('express');
var router = express.Router();
const db = require('../db/models');
//const db = require('../db/config');

/* GET users listing. */
router.get("/", function (req, res, next) {
  /*var filter = req.body.filter || {}
  return db.User.findAll(filter).then((users) => res.json(users))*/
  return res.json({success:"exito"})
})


module.exports = router;
