const express = require("express");
const router =  express.Router();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];


router.get("/add",(req,res,next)=>{
});

router.get("/get",(req,res,next)=>{
    res.status(200).json({
        status:200,
        data:movies
    });
});

router.get("/get/by-date",(req,res,next)=>{
    movies.sort((d1,d2)=>{return d1.year - d2.year});
    res.status(200).json({
        status:200,
        data:movies
    });
});

 

router.get("/get/by-rating",(req,res,next)=>{
    movies.sort((m1,m2)=>{return m2.rating - m1.rating});
    res.status(200).json({
        status:200,
        data:movies
    });
});


router.get("/get/by-title",(req,res,next)=>{
    movies.sort((m1,m2)=>{return (m1.title>m2.title)?1:(m1.title== m2.title?0:-1)});
    res.status(200).json({
        status:200,
        data:movies
    });
});

router.get("/edit",(req,res,next)=>{
});
router.get("/delete",(req,res,next)=>{
});

module.exports = router;