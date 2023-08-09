const express = require('express');
const router = express.Router();

require('../DB/connection')

const User = require('../model/userSchema')

router.get('/' , (req , res) =>{
    res.send(`hello world from the server the server rotuer js`);
});

// router.post('/register' , (req , res) =>{

//     const {name , email , phone , work , password , cpassword} = req.body;
    
//     if(!name || !email || !phone || !work || !password || !cpassword){
//        return res.status(422).json({error:"You Need to field all required information"});
//     }

//     User.findOne({email: email})
//         .then((userExist) => {
//             if(userExist){
//                 return res.status(422).json({error:"Email already Exits"});
//             }
//             const user = new User({name , email , phone , work , password , cpassword})

//             user.save()
//                 .then(() =>{
//                     res.status(200).json({message : "user registered successfuly"})
//                 })
//                 .catch((error) =>{ res.status(500).json({error : "Fail to upload value"}) })
//         })
//         .catch((error) => {console.log(err);});
// })

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

        

    }catch(error){  console.log("Invail credentials")  }
    


})

module.exports = router;