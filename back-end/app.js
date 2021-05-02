const http = require("http");
var express = require('express');
var bodyParser =require('body-parser');
var app = express();
var path =require('path');
const mongoose = require('mongoose');
//const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '../front-end', 'index.html'));
  //  res.sendFile(__dirname+"/index.html");
})
app.post("/", function(req, res) {
  let newFeedback = new feedback({
      name:req.body.name,
      email:req.body.email,
      message:req.body.message
  })
  console.log(newFeedback);
  newFeedback.save();
  res.redirect("/");
});

mongoose.connect("mongodb+srv://admin:admin@cluster0.iypsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
//const uri = "mongodb+srv://admin:admin@cluster0.iypsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const feedschema ={
  name:String,
  email:String,
  message:String
}
const feedback = mongoose.model("Feedback",feedschema);
/*client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("database connect");
  client.close();
});*/

app.listen(8080, ()=> {
  console.log('Server running at http://127.0.0.1:8080/');
});
