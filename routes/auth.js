const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../models/user");

//receive and register the new user.
router.post("/register",(res,req,next)=>{
    

    //crypt the password hash
    //create a new User
    //insert to DB
    const saltRounds = 10;

    //check for an existing user
    User.find({username:req.body.username},(err,foundUser)=>{
        if(err){
            res.status(400).send(`Error searching for user - ${err}`);
        }
        if(foundUser.username === req.body.username){//found a user, return error
            res.status(200).send("User already exists");
        }else{//no users found lets insert them into the DB.
            bcrypt.hash(req.body.password, saltRounds, (err,hash)=>{
                if(err){
                    res.status(201).send(`Error hashing password - ${err}`);
                }else{
                    var user = new User({
                        username: req.body.username,
                        firstname: req.body.firstname,
                        password: bcrypt.genSalt(saltRounds, (err, salt) => {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {

                            });
                        }),
                        lastname: req.body.lastname,
                        account_type: req.body.account_type,
                        created_at: Date(),
                        updated_at: Date()
                    });
                    user.save((err) => {
                        if (err) {
                            res.status("400").send(`Error saving user - ${err}`);
                        } else {
                            console.log(`Created account ${user}`);
                            res.status("200").send(`Account created successfully.`);
                        }
                    });
                }
            });
        }
    });


    







});




module.exports = router;