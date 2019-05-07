const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const controller = require("./controller");
const authJobs = require("../authJobs");
const mockData = require("./sampleData.json");
const port = process.env.PORT || 5000;
const server = express();



server.use("/", express.static('client/public'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded( {extended : true}));


server.use('/api/keywords/', controller.getAll);


server.use('/api/searchJobs/', (req, res)=>{
  var keywords = req.body.keywords.join();
  // res.send(JSON.stringify(mockData));
  request(`https://authenticjobs.com/api/?api_key=${authJobs.key}&method=aj.jobs.search&keywords=${keywords}&format=json&perpage=25`,(err,responce,body)=>{
    if(err){
      res.send(err);
    } else {
      res.send(body);
    }
  })
})


server.listen(port, ()=>{
  console.log(`Connected on ${port}`);
})



