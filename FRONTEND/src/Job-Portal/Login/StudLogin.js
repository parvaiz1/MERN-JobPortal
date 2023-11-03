import { useState, useEffect } from "react"
import React from 'react'
import styles from "./login.module.css"
import axios from "axios"
import { useNavigate, Link, useLocation } from "react-router-dom";
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
import { useGoogleLogin } from '@react-oauth/google';
import image from "../img/user_3177440.png"



// import style from "./styles.module.css"



function StudentLogin(props) {

  const [gmailuser, setGmailuser] = useState("")
  const [topErrorMessage, setTopErrorMessage] = useState("")

  let location = useLocation()

  let navigate = useNavigate()

  



  const login = useGoogleLogin({
    onSuccess: async (response) => {
    console.log("clicked")
      console.log("response is ", response.access_token)
      try {

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        setGmailuser(res.data)
        console.log("response token is ", response.access_token)
        let gtoken = response.access_token
        console.log("data : ", res.data)
        let userId = res.data.sub
        let email = res.data.email
        let name = res.data.name
        // let image= res.data.picture
        // console.log("decoded name :", gemail)
        // console.log(" decoded id :", gname)

        await axios.post("http://localhost:8080/StudentProfile/Glogin", { userId, email, name, gtoken })
          .then((response) => {
            console.log("data from backend",response.data)
            let result = response.data
            let token = result.token
            let Id = result.id
            if (result.status == "success") {
              localStorage.setItem("StudLog", JSON.stringify(token))
              navigate("/alljobs", {state:{name:result.name}})
              localStorage.setItem("StudId", JSON.stringify(Id))
             
            }
          }).catch((err) => {
            alert("serer issue kindly wait")
          })

      } catch (err) {
        alert("some thing went wrong with google gmail", err)
      }
    }
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [a, setA] = useState("")
  const [studloggedin, setStudoggedin] = useState(false)
  const [topuperror, setTopuperror] = useState("")


  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  })
  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/postedjobs")
    }
  }, [])

  // async function Studlogin() {
  //   console.log("before sending to backend", email, password)
  //   await axios.post("http://localhost:8080/user/login/", { email, password })
  //     .then((response) => {
  //       console.log(response)
  //       let result = response.data
  //       console.log(result)
  //       if (result.token) {
  //         localStorage.setItem("StudLog", JSON.stringify(result.token))
  //         let sudid = result.id
  //         localStorage.setItem("StudId", JSON.stringify(sudid))
  //         // console.log(result.id)
  //         navigate("/alljobs", {state:{userId : sudid}})
  //       } else if (result == "incorrect password") {
  //         setTopuperror("! incorrect passord")
  //       } else if (result == "no user found") {
  //         setTopuperror("! no user exist with this mail id")

  //       }
  //     }).catch((err) => {
  //       alert("server issue occured")
  //       console.log("server issue occured")
  //     })

  // }

  // function login() {
  //   window.open(
  //     `http://localhost:8080/auth/google/callback`,
  //     "_self"

  //   );
  // }
  return (
    <>
    <h3 className={styles.Loginpage}>Welcome to the Job Seeker Login page of Blue Impulse </h3>
    
      {/* <p className={styles.topuperror}>{topuperror}</p>
      <div id={styles.inputWrapper}>
        <div id={styles.inputsTag}>

          <input className={styles.inputs} type="mail" placeholder='enter mail address'
            value={email} onChange={(e) => { setEmail(e.target.value) }} />
          {error && !email ? <p >field is missing</p> : ""}

          <input className={styles.inputs} type="name" placeholder='enter password'
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
          {error && !password ? <p >field is missing</p> : ""}

          <button className={`${styles.button} ${styles.inputs}`} >Login</button>
        </div>
      </div>
      <h4 className={styles.OR}>OR</h4> */}

<div className={styles.BothsignUpWrapper}>

      <div className={styles.signUpWrapper} onClick={login} >
        <div className={styles.both}>
          <img className={styles.google} src={GoogleImage} />
          <span className={styles.signUpwrap} >Continue with Google</span>
        </div>
       </div>

      <div className={styles.signUpWrapper}  >
        <div className={styles.both}>
          <img className={styles.google} src={MicosoftImage} />
          <span className={styles.signUpwrap} >Continue with Microsoft</span>
        </div>
      </div>
      </div>
    </>

  )
}

export default StudentLogin