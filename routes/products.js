var express = require('express');
var router = express.Router();
const controller = require('../controllers/product-controller')

router.get("/", async (req, res, next) => {
  const products = await controller.getAll()
  res.json({products})
    
})

router.get('/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    const product = await controller.getById(id);
    res.json({ product });
  });



module.exports = router;
