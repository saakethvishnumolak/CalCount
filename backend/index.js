const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cors = require('cors');

// importing models
const userModel = require('./models/userModel');
const foodModel = require('./models/foodModel');
const trackingModel = require('./models/trackingModel');
const verifyToken = require('./verifyToken');


//database connection
mongoose.connect("mongodb://localhost:27017/calcount")
.then(() => {
    console.log("Database connection successful!");
}) .catch((err) => {
    console.log(err);
})


const app = express();

app.use(express.json());
app.use(cors());

//Registration Begin
app.post("/register", (req,res) => {

    let user = req.body;

    //encrypting the password using bcrypt
    bcrypt.genSalt(10,(err,salt) => {
        if(!err)
        {
            //encrypting password
            bcrypt.hash(user.password,salt,async (err,hpass) => {
                if(!err)
                {
                    //replace with new password(hpass)
                    user.password = hpass;
                    //Checks if there is issue with password
                    try
                    {
                    
                        let doc = await userModel.create(user)
                        res.status(201).send({message: "User Registered"})
                    }
                    catch(err) {
                        console.log(err);
                        res.status(500).send({message: "Some Problem"})
                    }
                }
            })
        }
    })
})
//Registration End

//Login Begin
app.post("/login", async (req,res) => {

    let userCred = req.body;

    try
    {
        //Checks if user with these credentials are already in the system
        const user = await userModel.findOne({email:userCred.email});
        if(user!==null)
        {
            bcrypt.compare(userCred.password, user.password,(err, success) =>{
                if(success == true)
                {
                    //Whenever login is successful, generate a token instead of sending message
                    jwt.sign({email:userCred.email}, "calcountapp", (err, token) => {
                        if(!err)
                        {
                            res.send({message: "Login Successful!", token:token});
                        }
                    })
                }
                else
                {
                    res.status(403).send({message: "Incorrect Password"});
                }
            })
        }
        else
        {
            res.status(404).send({message:"User not found"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message: "Some Problem"});
    }
  
})
//Login End


//Fetches all the foods
app.get("/foods", verifyToken, async (req, res) => {

    try
    {
        let foods = await foodModel.find();
        res.send(foods);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message: "Problem while getting info"});
    }
})
//Fetching all the foods end

//Searches food by name begin (single food search)
app.get("/foods/:name", verifyToken, async (req,res) => {
    try
    {
        //$regex gets syntax, $options case insensitive
        let foods = await foodModel.find({name:{$regex:req.params.name, $options:'i'}});
        if(foods.length!==0)
        {
            res.send(foods);
        }
        else
        {
            res.status(404).send({message: "Food item not found"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Problem getting the food"});
    }
})
//Searching food by name end

//Tracking the food start
app.post("/track", verifyToken, async (req, res) => {
    
    let trackData = req.body;

    try
    {
        let data = await trackingModel.create(trackData);
        res.status(201).send({message: "Food added!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message: "Problem in getting the food"});
    }
})
//Tracking the food end



//Fetching food eaten by a PERSON start
app.get("/track/:userid/:date", verifyToken, async (req, res) => {

    let userid = req.params.userid;
    let date = new Date(req.params.date);
    let strDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    

    try
    {
        let foods = await trackingModel.find({userId:userid, eatenDate:strDate}).populate('userId').populate('foodId');
        res.send(foods);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message: "Problem in getting the food"});
    }
})


//To check if server is running
app.listen(8000, () => {
    console.log("Server is up and running");
})