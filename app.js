//Sets up express
const express = require("express");
const got = require("got");
const app = express();
const port = process.env.PORT || 8080;

//Requires a path
const path = require("path");
const public = path.resolve("./public");

//Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Main path for the app
app.use(express.static("./public"));

//Takes user to the homepage
app.get("/index", (req, res) => res.sendFile(public + "/index.html"));
app.get("/", (req, res) => res.sendFile(public + "/index.html"));

//Takes user to restaurants page based on the id. You drop off the id to give the proper page. That id is only used on the client side
app.get("/restaurants/:id", (req, res)=> res.sendFile(public +"/restaurants.html"))

//This is a catch block. The asterisk is for anything. 
app.get("*", (req, res)=>{
    res.sendFile(public+"/404.html")
})

//Tells the command line where the port is listening
app.listen(port, () => console.log(`API app listeningport ${port}!`));