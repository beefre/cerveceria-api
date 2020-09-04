var express = require('express');
var router = express.Router();
const db = require('../db/models');
//const db = require('../db/config');

/* GET users listing. */
router.get("/", function (req, res, next) {
   var filter = req.body.filter || {}
  // return db.User.findAll(filter).then((users) => res.json(users))
  
  //return res.json({success:"exito"})

  try {
    return db.User.findAll(filter).then((users) => res.json(users)).catch(err => alert(error))
  } catch (error) {
    console.log(error)
    
  }
})

// router.get("/", function (req, res) {
//   try {
    
//     db.User.findAll({},(err,users)=>{ 
              
//         res.send({users})

//     });
    
  
//   } catch (error) {
//     console.log("Ligas not found: ",error);
//   }
// });


module.exports = router;
