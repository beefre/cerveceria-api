var express = require('express');
var router = express.Router();
const controller = require('../controllers/product-controller')

router.get("/", async (req, res, next) => {
  const products = await controller.getAll()
  res.json({products})
    
})

module.exports = router;
