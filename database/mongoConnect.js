const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/keywords', { useNewUrlParser: true, useCreateIndex: true,});

const db = mongoose.connection;
db.on('error', (err)=>{
  console.log("Connection Error", err);
})

db.once('open', ()=>{
  console.log('database connected')
})

const keywordSchema = new mongoose.Schema({
  keyword : {
    type: String,
    required : true,
    unique : true
  },
  weight : {
    type: Number,
    required: true,
    unique: false
  }
})

const keywords = mongoose.model('keywords', keywordSchema);


module.exports=keywords;