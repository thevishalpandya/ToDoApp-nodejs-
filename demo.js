var express = require("express");

var todoController = require("./controllers/todoControllers");

var app = express();

app.set("view engine","ejs");

app.use(express.static("./public"));


app.listen(3000);

//fire controller
todoController(app);

console.log("you are listening to the port 3000");