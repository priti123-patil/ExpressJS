const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const requests = require('requests');
//Routing - navigating to different routes - about,contact,home

//console.log(__dirname)
//console.log(path.join(__dirname, "../public"));
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//to set the view engine
app.set("view engine","hbs");
app.set("views",templatePath);
const hbs = require('hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(templatePath));
//builtin middleware

//template engine route
app.get("/", (req, res)=> {
    res.render('index',{ //refering to index.hbs
        name : "priti"
    });
});

app.get("/home",(req , res) => {
    res.end("Hello from home");
});
app.get("/about",(req,res) => {
    res.end("Hello from about us page");
});
app.get("/about",(req,res) => {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=03df54177e4bb18beef02bce009b3b5d`
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          // console.log(arrData[0].main.temp);//main and temp are api keys
          console.log(`city name is ${arrData[0].name} and the temp name is ${arrData[0].main.temp}`);

          //const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
          res.write(`city name is ${arrData[0].name} and the temperature is ${arrData[0].main.temp}`);
          // console.log(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
});

app.get("*",(req,res) => {
    res.render('404',{
        errorcomment : "404 Error"
    });
});

app.listen( port , () => {
    console.log(`Listeng to port no. ${port}`);
});

