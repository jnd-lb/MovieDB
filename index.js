// Importing
const http = require('http');
const app = require("express")();

//Middleware


//handle 404
app.use(
    (req,res,res)=>{
       console.log("hello");
    }
);

// Creating a server and listening at port 3000
const server = http.createServer();
server.listen(3000);