var express = require('express');
const db = require('../db/models');


const getAll = async () => {
    try {
        const products = await db.Product.findAll({raw:true})
        console.log(products)
        return products;
        
    } catch (error) {
        console.log(error)
        
    }
}

const getById = async (id) => {
    try {
      const product = await db.Product.findOne({
        raw: true,
        where: { id: id }
      });
      return product;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const create = async (product) => {
    try {
      //express validator
      await db.Product.create(product);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }



// Actualiza la información de un destino
const update = async (id,product) => {
  try {
    await db.Product.update(product, {
      where: { id: id },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Elimina un registro de destinos de la base de datos
const destroy = async (id) => {
  try {
    await db.Product.destroy({
      where: {
        id: id
      }
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy
};
