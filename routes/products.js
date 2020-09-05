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

  router.post('/create', async (req, res) => {
    const product = req.body;
    const success = await controller.create(product);
    if (success) {
      res.send('Se ha creado correctamente');
    } else {
      res.send('Ha ocurrido un error al crear');
    }
  });


module.exports = router;
