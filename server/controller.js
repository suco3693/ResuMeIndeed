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
  },
  updateAll: (incrementWords)=>{
    console.log(incrementWords);
    incrementWords.forEach((keyword)=>{
      keywords.findOneAndUpdate({'keyword': keyword},{$inc :{'weight': 1}},{upsert : true},(err, responce)=>{
        if(err){
          console.log(err);
          return err;
        } else {
          return responce;
        }
      })
    })
  }
}


module.exports = controller;