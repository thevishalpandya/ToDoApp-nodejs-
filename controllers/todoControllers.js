var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to the database
mongoose.connect("mongodb://vishal:vishal98@ds149404.mlab.com:49404/mongo");

//create a schema
var todoSchema = new mongoose.Schema({
   item:String 
});

//create a model
var Todo = mongoose.model("Todo",todoSchema);

//var data = [{item:"milk"},{item:"water"},{item:"cream"}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
app.get("/todo",function(req,res){
    //get data from mongodb and shows to the view
Todo.find({},function(err,data){
if(err) throw err
res.render("todo",{todos:data});  
});
});
app.post("/todo",urlencodedParser,function(req,res){
    //send data to the mongodb
    var itemOne = Todo(req.body).save(function(err,data){
   if(err) throw err;
    res.json(data); 
});
});
    
app.delete("/todo/:item",function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g,"")}).remove(function(err,data){
          if(err) throw err;
          res.json(data);
      });
});   
}