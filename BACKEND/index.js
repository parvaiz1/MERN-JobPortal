require("dotenv").config()
const cors = require("cors")
const express = require("express");
const app = express();
const StudentProfileRoutes = require("./Routes/StudentProfileRoutes");
const EmpProfileRoutes = require("./Routes/EmpProfileRoutes");
const jobpostRoutes = require("./Routes/JobpostsRoutes");

const { MongoClient } = require("mongodb")
const mongoose = require("mongoose");
const port = 8080;

// mongoose.connect("mongodb://127.0.0.1:27017/Job-Portal-Database")
mongoose.connect("mongodb+srv://blueimpluse:jobportal1234@cluster0.5dgcnm4.mongodb.net/jobportalMern")

// mongoose.connect("mongodb+srv://parvaizmahroo1:XOEY2kA0oPZ8d9jx@mahroo.rplbc7l.mongodb.net/?retryWrites=true&w=majority",{
//     useNewUrlParser:true,
//     UseUnifiedTopology:true
// })
    .then((res) => { console.log("connected") })
    .catch(() => { console.log("failed") })

app.use(express.json())
app.use(cors(
    {
        origin:["https://job-portal-front-end-theta.vercel.app"],
        methods: ["POST","GET"],
        credentials:true
    }
))
app.use(express.static('public'))
app.use(express.json())
app.get("/", (req,res)=>{
    res.send("Hello")})
app.use("/StudentProfile",StudentProfileRoutes)
app.use("/EmpProfile",EmpProfileRoutes)
app.use("/jobpost", jobpostRoutes)

app.use("*", (req, res) => {
    res.send(" Cannot get from backend with **")
})



app.listen(port, () => {
    console.log(`app running on port ${port} for booking`)
})
