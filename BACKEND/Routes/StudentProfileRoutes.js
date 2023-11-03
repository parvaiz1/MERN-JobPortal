const express = require("express");
const router = express.Router();
const StudentProfileModel= require("../Schema/StudentProfileSchema")
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
    let result= await StudentProfileModel.updateOne(
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

// delete image for studentProfile....
router.put("/deleteImage/:id", async (req, res) => {
    console.log(req.body)

    try {
        let result = await StudentProfileModel.updateOne(           
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

// .....initial login.............................
router.post("/Glogin", async (req, res) => {
    try {
    let { userId, gtoken, email, name,  } = (req.body)

        let user = await StudentProfileModel.findOne({ email: email });
        if (user == null) {
            const user = await new StudentProfileModel({userId:userId, email:email, name:name})
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
// .........get userprofile to show in my profile and for update..........
router.get("/getProfile/:id", async (req, res) => {
    try {
        let result = await StudentProfileModel.findOne({ _id: req.params.id })
        if (result) {
            res.send({status:"success", result})
        } 
        
    } catch (err) {
        res.send("back end error occured")
    }
})

// .....update full student profile...........
router.put("/updatProfile/:id",  async (req, res) => {
    try {
        console.log(req.file)

        let result = await StudentProfileModel.updateOne(
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
//  getting student-profile with applied user id for Employee......
router.get("/getAppliedProfileByIds/:id", async(req,res)=>{
    let comingArray= req.params.id
    
    let spliArray = comingArray.split(",")
    // console.log("spliArray",spliArray)

    try{
        // console.log("local value",['6533629f105bb11463d44bb4', '652f76a8eff06fe23539e03d','652f73966749e34e868567e1'])
        const profile= await StudentProfileModel.find({_id:{$in:spliArray}})
        
        if(profile){
            res.send(profile)
        }else{
            res.send("not found")
        }

    }catch(err){
        res.send("server error occured")
        console.log(err)
    }
})

// router.put("/status/:id", async(req, res)=>{
//     console.log(req.body)
//     console.log(req.params.id)
//     try{
//         let result= await StudentProfileModel.updateOne(
//             {_id:req.params.id},
//             {$set:req.body}
//         )
//         if(result){
//             res.send("success")
//         }
        
//     }catch(err){
//         res.send("back error occured")
//         console.log(err)
//     }

// })




module.exports = router



// ................Google Auth setup......bcrypt
// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         err: true,
//         message: "log in failure",
//     });
// });

// router.get("/auth/google",
//     passport.authenticate("google", { scope: ['openid', 'profile', 'email'] },
//             https:www.googleapis.com/auth/plus.login
//     ));

// router.get("/auth/google/callback",
//     passport.authenticate("google", {

//         successRedirect: "/login/success",
//         failureRedirect: "/login/failed"
//     }),
//     function (req, res) {
//         res.redirect("login/success");
//     }
// );
// router.get("/login/success", (eq, res) => {
//     if (req.user) {
//         res.status(200).json({ status: "login success", user: req.user })
//     }
// })

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(process.env.CLIENT_URL);
// });
// .................................users.....for Register.....................................

// router.post("/Register", body('email').isEmail(), async (req, res) => {

//     let { name, email, password, confirmPassword } = (req.body)
//     if (!name || !email || !password || !confirmPassword) {
//         res.send("fields are missing")
//     }
//     const error = validationResult(req)
//     if (!error.isEmpty()) {
//         return res.send("invalid email")
//     }
//     else if (password !== confirmPassword) {
//         res.send("password and confirm password are not matching")
//     }
//     let pass = password.toString()
//     let salt = await bcrypt.genSalt(10)
//     let hashPassword = await bcrypt.hash(pass, salt);
//     password = hashPassword
//     console.log("pass", password)
//     try {
//         const user = new userModel({ name, email, password })
//         const result = await user.save()
//         let token = jwt.sign({ id: user._id }, secretKey)
//         return res.json({ result: "success", token })
//     } catch (err) {
//         res.json(err)
//     }
// })

// router.post("/GmailRegister", async (req, res) => {
//     let { gemail, gname } = (req.body)
//     try {
//         const user = await new userModel({ email: gemail, name: gname })

//         const result = await user.save(user)
//         console.log(result)
//         res.send({ status: "result is ", result })
//     } catch (err) {
//         res.send(err)
//     }
// })


// ................................Login with password.........................

// router.post("/login", async (req, res) => {
//         const { email, password } = (req.body)
//         if (!email || !password) {
//             res.send("fileds are missing")
//         }
//         try {
//             const user = await userModel.findOne({ email: email });
//             if (user == null) {
//                 res.send("no user found")
//             } else {
//                 const hashedpassword = user.password
//                 let pass = password.toString()

//                 let result = bcrypt.compareSync(pass, hashedpassword)

//                 if (result == true) {

//                     let token = jwt.sign({ id: user._id }, secretKey)

//                     return res.json({ result: "success", id: user._id, token })
//                 } else {
//                     res.send("incorrect password")
//                 }
//             }
//         }
//         catch (err) {
//             res.send(err)
//         }
//     })

