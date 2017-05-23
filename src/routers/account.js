const express = require('express');
const bodyParser = require('body-parser');

const AccountModel =require('../model/createAccount.js');
const router = express.Router();

router.use(bodyParser.json());

var NCRYPTO = require('n-crypto');
var nCrypto = new NCRYPTO({
        aes_key:'aaaaaaaaaaaaaaaa'//aes key,16 characters
    });



// createAccount-Create
router.post('/posts',function(req,res,next){
  const {name, password, email} = req.body;
  if(!name || !password || !email){
    const err = new Error('password and name are required');
    err.status = 400;
    throw err;
  }
  var decode_name = nCrypto.decrypt(name,'AES');
  var decode_password = nCrypto.decrypt(password,'AES');
  var decode_email = nCrypto.decrypt(email,'AES');
  AccountModel.create(decode_name, decode_password, decode_email).then(post => {
    res.json(post);
  }
  ).catch(next);
});

// createAccount-Check
router.post('/login',function(req,res,next){
  const {name,password} = req.body;
  var decode_name = nCrypto.decrypt(name,'AES');
  var decode_password = nCrypto.decrypt(password,'AES');

  if(!decode_name ){
    const err = new Error('password and name are required');
    err.status = 400;
    throw err;
  }
  AccountModel.check(decode_name, decode_password).then(post =>{
      res.json(post);
  }).catch(next);
});

module.exports = router;
