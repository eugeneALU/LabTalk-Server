const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');
const AccountModel =require('../model/createAccount.js');
const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);



// createAccount-Create
router.post('/posts',function(req,res,next){
  const {name, password, email} = req.body;
  if(!name || !password || !email){
    const err = new Error('password and name are required');
    err.status = 400;
    throw err;
  }

  AccountModel.create(name, password, email).then(post => {
    res.json(post);
  }
  ).catch(next);
});

// createAccount-Check
router.post('/login',function(req,res,next){
  const {name, password} = req.body;

  if(!name ){
    const err = new Error('password and name are required');
    err.status = 400;
    throw err;
  }
  AccountModel.check(name, password).then(post =>{
      res.json(post);
  }).catch(next);
});

module.exports = router;
