// const GoogleStrategy = require("passport-google-oauth20").Strategy
// const passport = require("passport")
// const userModel = require("./Schema/userSchema")

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID:"898013594672-l7hv67lotvsm5pbn8c1g6q8qavr6ji7i.apps.googleusercontent.com",
//             clientSecret:"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",
//             callbackURL:"http://localhost:8080/auth/google/callback",
//             scope:["profile" , "email"],
//         },
//         async function(accessToken, refreshToken, profile, done){
//             console.log(profile) // save in data base
//            return  done("Error", profile);
//         }
//     )
// );
// passport.serializeUser((user,callback)=>{
//     console.log("serializeUser" , user)
//     callback(null, user);
// });
// passport.deserializeUser((id,callback)=>{
//     const gotUser = userModel.findOne({where : {id}}).catch((err)=>{
//         console.log("error in deserializeUser" , err)
//     })
//     console.log("deserializeUser" , gotUser)
//     callback(null, gotUser);
// });

// module.exports=passport

