// Importing
const express = require("express");
const app = express();

//Middleware
app.use("", (req,res,next)=>{
        res.send("ok");
    }
);

// Creating a server and listening at port 3000
app.listen(3000);