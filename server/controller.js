// const mongoose = require('mongoose');
const keywords = require("../database/mongoConnect");


const controller = {
  getAll: (req, res)=>{
    keywords.find({},(err, data)=>{
      if(err){
        res.status(404);
        res.send(err);
      } else {
        res.status(200);
        res.send(data);
      }
    })
  }
}


module.exports = controller;