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

// Actualiza la información de un destino
router.post('/update/:id', async (req, res) => {
  const id = Number(req.params.id);
  const product = req.body;
  const success = await controller.update(id, product);
  if (success) {
    res.send('Datos actualizados correctamente');
  } else {
    res.send('Hubo un error al actualizar el registro');
  }
});

// Elimina un registro de destinos de la base de datos
router.post('/delete/:id', async (req, res) => {
  const id = Number(req.params.id);
  const success = await controller.destroy(id);
  if (success) {
    res.send('El registro se ha eliminado correctamente');
  } else {
    res.send('No se ha podido eliminar el registro');
  }
})


module.exports = router;
