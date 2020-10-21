const { json } = require("express");
const express = require("express");
const router =  express.Router();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];


router.get("/add",(req,res,next)=>{
    //?title=<TITLE>&year=<YEAR>&rating=<RATING></RATING>

    const {title,year,rating=4}=req.query;

    if(title==undefined || year==undefined || !year.match(/^[0-9]{4,4}/)){
        res.status(403).json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'});
        return;
    }
    
    console.log(req.query.title)
    movies.push({
        title:title,
        year:year,
        rating: parseFloat(rating)
    });
    res.status(201).json({status:201,data:movies});
    
});

router.get("/get",(req,res,next)=>{
    res.status(200).json({
        status:200,
        data:movies
    });
});

router.get("/get/id/:id",(req,res,next)=>{
    const id = req.params.id;
    //handle wrong it type
    if(!id.match(/[0-9]/)){
        res.status(403).json({status:403, error:true, message:'the id should be a digit'});
    }
    
    //handle not existing movie
    if(id<0 || id>=movies.length){
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`});
    }
    res.status(200).json({
        status:200,
        data:movies[id]
    });
});



router.get("/delete/id/:id",(req,res,next)=>{
    const id = req.params.id;
    //handle wrong it type
    if(!id.match(/[0-9]/)){
        res.status(403).json({status:403, error:true, message:'the id should be a digit'});
    }
    
    //handle not existing movie
    if(id<0 || id>=movies.length){
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`});
    }

    movies.splice(id,1);

    res.status(200).json({
        status:200,
        data:movies
    });
});

//Update
router.get("/update/id/:id",(req,res,next)=>{
    const id = req.params.id;
    const {title,rating,year} = req.query;

    //handle wrong it type
    if(!id.match(/[0-9]/)){
        res.status(403).json({status:403, error:true, message:'the id should be a digit'});
    }
    
    //handle not existing movie
    if(id<0 || id>=movies.length){
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`});
    }

    if(title) movies[id].title=title;
    if(year) movies[id].year=+year;
    if(rating) movies[id].rating=parseFloat(rating);
    
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