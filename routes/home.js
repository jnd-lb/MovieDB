const express = require("express");
const router =  express.Router();

router.get("/test",(req,res,next)=>{
    res.status(200).json({status:200, message:"ok"});
});

router.get("/time",(req,res,next)=>{
    const date = new Date();
    let dateString = date.toDateString();
    res.status(200).json({status:200, message: dateString});
});

module.exports = router;