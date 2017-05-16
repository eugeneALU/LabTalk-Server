const express = require('express');
const bodyParser = require('body-parser');

const CalendarModel =require('../model/calendar.js');
const router = express.Router();

router.use(bodyParser.json());

router.post('/createactivity',function(req,res,next){
  const {newtitle,newtime,newdata,group_id,day} = req.body;
  if(!newtitle || !newtime|| !newdata || !group_id){
    const err = new Error('missing something');
    err.status = 400;
    throw err;
  }
  CalendarModel.create(newtitle,newtime,newdata,group_id,day).then(post => {
    res.json(post);
  }
  ).catch(next);
});

router.post('/selectactivity',function(req,res,next){
  const {group_id} = req.body;
  if(!group_id){
    const err = new Error('missing group id');
    err.status = 400;
    throw err;
  }
  CalendarModel.select_group(group_id).then(post => {
    res.json(post);
  }
  ).catch(next);
});

module.exports = router;