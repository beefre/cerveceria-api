var express = require('express');
var router = express.Router();
const controller = require('../controllers/user-controller')



/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await controller.getAll()
  res.json({users})
    
})

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const user = await controller.getById(id);
  res.json({ user }); 
});


router.post('/create', async (req, res) => {
  const user = req.body;
  const success = await controller.create(user);
  if (success) {
    res.send('Se ha creado correctamente');
  } else {
    res.send('Ha ocurrido un error al crear');
  }
});

router.post('/update/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = req.body;
  const success = await controller.update(id, user);
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
