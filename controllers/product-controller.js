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




module.exports = {
    getAll
};
