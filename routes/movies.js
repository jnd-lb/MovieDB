const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./home");
const {ObjectID} = require('mongodb');

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

let db = null;


//body parser
router.use(bodyParser.json());


/////////////INSERT/////////////////
router.post("/", (req, res, next) => {
    //TODO sanitize user input
    let { title, year, rating = 4 } = req.body;

    //handle missing feild
    if (title == undefined || year == undefined || !(year > 1800 && year < 2021)) {
        res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
        return;
    }

    const newMovie = {
        title: title,
        year: year,
        rating: parseFloat(rating)
    };

    db.collection('movies').insertOne(newMovie, (err, results) => {
        if (err) res.status(500).json({ status: 500, error: true, message: "internal error" });
        res.status(201).json({ status: 201, data: results["ops"][0] });
    });

    
});

/////////////Read ALL//////////////
router.get("/", (req, res, next) => {

    db.collection('movies').find({},
         (err,elements) => {
             let arrayOfElements = [];
            elements.forEach((element,err)=> {
                if(err) console.log(err);
              //  console.log(element);
                arrayOfElements.push(element);
            },()=>{
                console.log(arrayOfElements);
                res.status(200).json({
                    status: 200,
                    data: arrayOfElements
                })
            });
        }
    );
});




/////////////Delete By Id/////////////
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': ObjectID(id) };
    db.collection('movies').deleteOne(details, (err, item) => {
        //handle not existing movie
        if (err) {
            res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
        } else {
            //redirected to the the GET /movies/ to list all the remaining movies
            res.status(200);
            res.redirect("/movies/");
        }
    });
});

/////////////Update By Id/////////////
router.put("/:id", (req, res, next) => {
    const id = req.params.id;

    const { title, rating, year } = req.body;

    const details = { '_id': ObjectID(id)};
    const updateMovie = {};

    if (title) updateMovie["title"] = title;
    if (year) updateMovie["year"] = +year;
    if (rating) updateMovie["rating"] = parseFloat(rating);

    db.collection('movies').update(details, { $set:updateMovie}, (err, result) => {
        if (err) {
            res.status(500).json({ status: 500, error: true, message: "internal error" });
        } else {
            //display updated entry
            res.status(200);
            res.redirect(`/movies/${id}`);
        }
    });
});

/////////////Get By date "By year" /////////////
router.get("/by-date", (req, res, next) => {

    db.collection('movies').find({},
        (err,elements) => {
            let arrayOfElements = [];
            elements.sort({year:1});
           elements.forEach((element,err)=> {
               if(err) console.log(err);
             //  console.log(element);
               arrayOfElements.push(element);
           },()=>{
               console.log(arrayOfElements);
               res.status(200).json({
                   status: 200,
                   data: arrayOfElements
               })
           });
       }
   );
});

router.get("/by-rating", (req, res, next) => {
    db.collection('movies').find({},
        (err,elements) => {
            let arrayOfElements = [];
            elements.sort({rating:1});
           elements.forEach((element,err)=> {
               if(err) console.log(err);
             //  console.log(element);
               arrayOfElements.push(element);
           },()=>{
               console.log(arrayOfElements);
               res.status(200).json({
                   status: 200,
                   data: arrayOfElements
               })
           });
       }
   );
});

router.get("/by-title", (req, res, next) => {
    db.collection('movies').find({},
        (err,elements) => {
            let arrayOfElements = [];
            elements.sort({title:1});
           elements.forEach((element,err)=> {
               if(err) console.log(err);
             //  console.log(element);
               arrayOfElements.push(element);
           },()=>{
               console.log(arrayOfElements);
               res.status(200).json({
                   status: 200,
                   data: arrayOfElements
               })
           });
       }
   );
});

/////////////Get By ID/////////////
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': ObjectID(id) };

    db.collection('movies').findOne(details, (err, item) => {
        //handle not existing movie
        console.log(err)
        console.log(item)
        if (err) { res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` }); }
        else {
            res.status(200).json({
                status: 200,
                data: item
            });
        }
    });
});


module.exports = (_db) => {
    db = _db;
    return router;
}
