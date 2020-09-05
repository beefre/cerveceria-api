var express = require('express');
var router = express.Router();
const db = require('../db/models');


const getAll = async () => {
    try {
        const users = await db.User.findAll({raw:true})
        console.log(users)
        return users;
        
    } catch (error) {
        console.log(error)
        
    }
}




module.exports = {
    getAll
};
