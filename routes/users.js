var express = require('express');
var router = express.Router();
//const db = require('../db/models');
const controller = require('../controllers/user-controller')



/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await controller.getAll()
  res.json({users})
    
})



module.exports = router;
