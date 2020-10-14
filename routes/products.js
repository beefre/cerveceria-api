var express = require('express');
var router = express.Router();
const controller = require('../controllers/product-controller')
const {uploadFileToS3} = require('../utils/fileuploader')
const uuid = require('uuid')
const path = require('path')

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

    if(req.files) {
      let image = req.files.image;
      const fileName = image.name;
      const generatedFileName = `${uuid.v4()}${path.extname(fileName)}`;
      const filePathAndName = `./public/images/${generatedFileName}`;
      await image.mv(filePathAndName);
      const imageUrl = await uploadFileToS3(filePathAndName, generatedFileName);
      product.image = imageUrl;
    }

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
