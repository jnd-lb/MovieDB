// Importing
const app = require("express")();
const db = require('./config/db');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const userRoute= require("./routes/user")
let database = null;


//const uri = "mongodb+srv://jihad:a123456@cluster0.uxnou.mongodb.net/moviesdb?retryWrites=true&w=majority";

const uri = "mongodb+srv://jihad:a123456@cluster0.uxnou.mongodb.net/moviesdb?retryWrites=true&w=majority";
//"mongodb+srv://jihad:abc123abc@lamba.vmnb3.mongodb.net/moviesdb?retryWrites=true&w=majority"
const client = new MongoClient(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

client.connect(err => {
    if (err) console.log(err);
    const db = client.db("moviesdb");
    console.log(">>>>>here>>>>>>");

    //import routers and pass the database
    const moviesRouter = require("./routes/movies.js")(db);
  //const homeRouter = require("./routes/home.js")(db);

    //Middleware
  //app.use("/", homeRouter);
    app.use("/movies", moviesRouter);
    app.use("/user",userRoute);

    //404 
    app.use((req, res, next) => {
        res.status(404).json("Sorry but we do not have what you are looking for ....bas jayina :)")
    });

})

/*.catch((err) => {
    console.log(">>>>There's an error<<<<");
    client.close();
})*/


// Creating a server and listening at port 3000
app.listen(8800);
