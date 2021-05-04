const http = require("http");
var express = require('express');
var bodyParser =require('body-parser');
var app = express();
var path =require('path');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '../front-end', 'index.html'));
 
})
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://admin:admin@cluster0.iypsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const feedschema ={
  name:String,
  email:String,
  message:String
}
const feedback = mongoose.model("Feedback",feedschema);


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

const movieSchema ={
  name:String,
  year:String
}
const Movie = mongoose.model('Movie',movieSchema);
app.get("/result",(req,res)=>{
 feedback.find({},function(err,feedbacks){
   res.render('result',{
      feeds: feedbacks
  
   })
 })
  //res.render(path.join(__dirname, '../views','result'));
});
app.listen(8080, ()=> {
  console.log('Server running at http://127.0.0.1:8080/');
});





/*client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("database connect");
  client.close();
});*/

