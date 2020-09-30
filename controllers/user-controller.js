var express = require('express');
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

const create = async (user) => {
    try {
      //express validator
      await db.User.create(user);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const update = async (id,user) => {
    try {
      await db.User.update(user, {
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
      await db.User.destroy({
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
    create,
    destroy,
    update
};
