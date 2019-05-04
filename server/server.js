const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const server = express();



server.use("/", express.static('client/public'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded( {extended : true}));




// server.use("/api/", router);


server.listen(port, ()=>{
  console.log(`Connected on ${port}`);
})



