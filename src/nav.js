const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
//Routing - navigating to different routes - about,contact,home

//console.log(__dirname)
//console.log(path.join(__dirname, "../public"));

const staticPath = path.join(__dirname, "../public");

//to set the view engine
app.set("view engine","hbs");

//app.use(express.static(staticPath));
//builtin middleware

app.get("/",(req , res) => {
    res.end("Hello from home");
});

app.get("/about" , (req,res) => {
    res.write("<h1>About me : Priti<h1>");
});
//On using status(), we are actually checking it's status first than sending some response which is a good practice , and  
//on using  send() ,we r  sending response directly i.e. what to show on the page ,
//So in case of an error we can send a message as response on using status () which is the benefit of this
app.get("/contact", (req,res) => {
    res.status(200).send("Contact = 7972404273");
});

//The res.send function 
//sets the content type to text/Html which means that the client will now treat it as text.

//res.json function on the other handsets the content-type header to application/JSON so that the client treats the response string 
//as a valid JSON object.

//When we send an simple object through response then express automatically converts it to the json 
app.get("/jsondata", (req,res) => {
    res.json([
        {
        id : "1",
        name : "priti"
    },
{
    id : 2,
    name : "rit"
},{
    id : "3",
    name: "Vishal"
}]
    );
});

app.listen( port , () => {
    console.log(`Listeng to port no. ${port}`);
});

