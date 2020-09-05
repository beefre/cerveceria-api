var express = require('express');
var router = express.Router();
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
      await db.Product.create(product);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

module.exports = {
    getAll,
    getById,
    create
};
