const router = require("express").Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [
    { username: "default", password: "$2b$10$2LxuEQWUh8Tpo.matWVcIO7joW9kPbnN1QJVSw3lGMuA3VtoRJdhW" }
];
let id = 0;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Middlewares
router.post("/signin", (req, res) => {
    //TODO sanitize
    const { username, password } = req.body;

    let result = isexist(username, password);

    if (!result) return res.status(401).json({
        status: 401, message: "Username Not Found", error: true
    });

    if (result == 500) return res.status(500).json({ status: 500, message: "there's an internal error", error: true });

    //Result not false => user exist but now we must see if the password provided is valid
    result.then((_result) => {
        console.log(_result)
        if (!_result) return res.status(401).json({
            status: 401, message: "Wrong Password", error: true
        });
    
        //In case password == password provided
        const token = jwt.sign(
            {
                username: username,
                userId: id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "you are logged in",
            token: token
        });
    })
});


/**
 * checks if the user name does exit in array 
 * returns token if if found the user - 500 in case of error - false if it is not found
 * @param {string,string} username,password 
 * @param {any} token. 
 */
const isexist = (username, password) => {
    let promise = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            // i implimented this way to not wast time hashing the password before if the username is not exist / and do not use the callback to make the code sycronously
            promise = bcrypt.compare(password, users[id].password);
            break
        }
        id = i;
    }

    if (promise == null) return false; // the username does not exist 
    return promise;

}

router.post('/signup', (req, res) => {
    //TODO sanitize and validate

    let { password, username } = req.body;
    console.log("Data recived:" + username + " " + password)

    return bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: "There's an internal error",
                error: true
            });
        }

        console.log("Hash:" + hash.toString());

        users.push({ username: username, password: hash });
        console.log(users);
        const token = jwt.sign(
            {
                username: username,
                userId: users.length - 1 // i'm taking the index of the elements in array as id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );
        return res.status(201).json({ status: 201, message: "signed up successfully", username: username, token: "Bearer " + token });

    });

});

module.exports = router;