// Importing
const express = require("express");
const homeRouter = require("./routes/home.js");
const app = express();

//Middleware
app.use("/",homeRouter);

//404
app.use((req,res,next)=>{
    res.status(404).json("Sorry but we do not have what you are looking for ....bas jayina :)")
});

// Creating a server and listening at port 3000
app.listen(3000);