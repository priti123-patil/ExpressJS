const express = require("express");
const app = express();
app.get("/",(req, res) => {
    res.send("Hello from Express");
});
app.get("/about",(req,res) => {
    res.end("Hello from about us page");
});
app.listen(8000, "127.0.0.1", () => {
    console.log("Listening...");
})

