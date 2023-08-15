const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../DB/connection')

const User = require('../model/userSchema')

router.get('/' , (req , res) =>{
    res.send(`hello world from the server the server rotuer js`);
});

router.post('/register' , async (req , res) =>{
    const { name , email , phone ,work , password , cpassword } = req.body;


    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"You Need to field all required information"});
    }

    try{
        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(422).json({error:"Email already Exits"});
        }

        const user = new User({name , email , phone , work , password , cpassword})

        await user.save();
        return res.status(201).json({message : "User register succesfull"});

    }catch(error){ console.log(error) }
    
})

router.post('/signin' , async (req , res) => {
    const { email , password } = req.body;

    if(!email || !password){
        return res.status(422).json({error : "write email and password"})
    }

    try{
        const userlogin = await User.findOne({email:email});
        const isMatch = await bcrypt.compare(password , userlogin.password)

        if(userlogin){
            const isMatch = await bcrypt.compare(password , userlogin.password);

            token = await userlogin.generateAuthToken();
            
            res.cookie("jwtoken" , token) , {
                expires : new Date(Date.now() + 2589000000),
                httpOnly: true
            };

            if(!isMatch){
                res.status(400).json({error : "Invail credentials"});
            }
            else{
                res.status(200).json({error : "user Signin Successfully"});    
            }
        }
        else{
            res.status(200).json({error : "user Signin Successfully"});
        }
        
    }catch(error){  console.log("Invail credentials")  }

})

module.exports = router;