const express = require("express");
const router = express.Router();
const EmpProfileModel= require("../Schema/EmpProfileSchema")
const bcrypt = require("bcrypt")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const secretKey = "abcde"
const otpGenerator = require("otp-generator")
const nodemailer = require("nodemailer");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/Images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.put("/uploadImage/:id",upload.single('image'), async (req, res)=>{
    imagePath = req.file.filename
    try{
    let result= await EmpProfileModel.updateOne(
        {_id:req.params.id},
        {$set:{image: `http://localhost:8080/Images/${imagePath}`}}
    )
    if(result){
    res.send(result)
}
}catch(err){
    res.send("back error occured")
}

})

// delete logo rout.........

router.put("/deleteImage/:id", async (req, res) => {
    console.log(req.body)
    try {
        let result = await EmpProfileModel.updateOne(           
            {_id: req.params.id}, 
            {$unset:req.body}
         )
         console.log(result)
        if (result) {
            res.send("success")
        }                     
    } catch (err) {
        res.send("back end error occured")
        console.log(err)

    }
})


router.post("/Glogin", async (req, res) => {
    try {
    let { userId, gtoken, email, name } = (req.body)
        let user = await EmpProfileModel.findOne({ email: email });
        if (user == null) {
            const user = await new EmpProfileModel({ email: email, name: name,  userId : userId })
            const result = await user.save(user)
            res.send({status : "success" ,token : gtoken ,id: result._id})
        } else {
            res.send({status : "success" ,token : gtoken ,id: user._id})
            // console.log("user email :", user)
        }

    } catch (err) {
        res.send(err)
    }
})
// get profile for my profile  and update frofile UI
router.get("/getProfile/:id", async (req, res) => {
    try {
        let result = await EmpProfileModel.findOne({ _id: req.params.id })
        if (result) {
            res.send({status:"success", result})
        } 
        
    } catch (err) {
        res.send("back end error occured")
    }
})

// get only company logo from from profile for job posts
router.get("/getLogo/:id", async (req, res) => {
    try {
        let result = await EmpProfileModel.findOne({ _id: req.params.id })
        if (result) {
            res.send(result.image)
        }         
    } catch (err) {
        res.send("back end error occured")
    }
})
// update full profile
router.put("/updatProfile/:id",  async (req, res) => {
    try {
        let result = await EmpProfileModel.updateOne(
            {_id: req.params.id},
           {$set:req.body
         })
        if (result) {
            res.send("success")
        } 
        
    } catch (err) {
        res.send("back end error occured")
        console.log(err)
    }
})




// ................................Login with password.........................



module.exports = router