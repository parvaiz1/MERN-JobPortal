import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import Styles from "./nav.module.css"
import logo from "../img/Blue.jpg"
import EmpNotification from "../img/icons8-notification-33.png"
import JobseekerNotification from "../img/icons8-notification-30.png"


import loginuser from "../img/icons8-user-96.png"
import StudentUpdateProfile from '../Profile/StudentUpdateProfile';

function Nav(props) {
  const [showprofile, setShowprofile] = useState(false)
  const navigate = useNavigate()

  let StudentAuth = localStorage.getItem("StudLog")
  let EmployeeAuth = localStorage.getItem("EmpLog")


  const logOut = () => {
    navigate("/")
    localStorage.clear("StudLog")
  }
  const logutEmp = () => {
    navigate("/")
    localStorage.clear("EmpLog")

  }

  let menuRef = useRef();
  let imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowprofile(false)

    }
  })

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "red" : "",
      textDecoration: isActive ? "underline" : ""
    }
  }
  function myprofile() {
    navigate("/My-Profile")
  }
  function updateprofile() {
    navigate("/Update-Profile")
  }

  function MyJobApplied() {
    navigate("/My-Applied-Jobs")
  }

  function updateEmployeeProfile() {
    navigate("/UpdateProfile")
  }

  function EmployeeProfile() {
    navigate("/MyProfile")
  }


  return (
    <>
      {
        //  ............................................Jobseeker Login...............................................   
        StudentAuth ?
          <>
            <div className={Styles.fullnavewrapper}>
              <div className={Styles.logoWrapper}>
                <NavLink > <img className={Styles.logo} src={logo} /> </NavLink>
              </div>
              <div className={Styles.linkWrapper}>

                <NavLink to="/alljobs" className={Styles.link} style={navLinkStyles}>All Jobs </NavLink>
                <NavLink className={Styles.link}>About Us</NavLink>
                <NavLink className={Styles.link}>Services</NavLink>
                <NavLink className={Styles.link}>Contact</NavLink>
                <div className={`${Styles.link} ${Styles.IconeWrapper}`}>

                  <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink>
                  <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                </div >

              </div>
            </div>
            {/* .....................drop down............ */}
            {showprofile ?
              <div class={Styles.dropdownwrapper} ref={menuRef} >
                <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p>

                <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                <p className={Styles.text} ref={menuRef} onClick={logOut}>Logout</p>

              </div>
              : ""}
          </>
          :
          // ..........................................Emplyee login.......................................................              
          (EmployeeAuth) ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.logoWrapper}>
                  <NavLink > <img className={Styles.logo} src={logo} /> </NavLink>
                </div>
                <div className={Styles.linkWrapper}>

                  <NavLink to="/postedjobs" className={Styles.link} style={navLinkStyles}> Posted jobs</NavLink>

                  <NavLink to="/PostJobs" className={Styles.link} style={navLinkStyles}>Post a Job</NavLink>


                  <NavLink className={Styles.link}>Services</NavLink>
                  <NavLink className={Styles.link}>Contact</NavLink>
                  <div className={`${Styles.link} ${Styles.IconeWrapper}`}>

                    <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink>
                    <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
              {/* .....................drop down............ */}
              {showprofile ?
                <div class={Styles.dropdownwrapper} ref={menuRef} >
                  <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                  <p className={Styles.text} ref={menuRef} onClick={updateEmployeeProfile}>Update profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                </div>
                : ""}
            </>
            :
            // ............................................Home Nave....................................................      
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.logoWrapper}>
                  <NavLink to="/"> <img className={Styles.logo} src={logo} /> </NavLink>
                </div>
                <div className={Styles.linkWrapper}>
                  <NavLink to="/" className={Styles.Hlink}> Home</NavLink>
                  <NavLink className={Styles.Hlink}>About Us</NavLink>
                  <NavLink className={Styles.Hlink}>Services</NavLink>
                  <NavLink className={Styles.Hlink}>Contact</NavLink>
                  <div className={`${Styles.Hlink} ${Styles.Loginlinkwrapper}`}>
                    {/* <div className={Styles.Loginlinkwrapper}> */}
                    <NavLink to="/EmployeeLogin" className={`${Styles.Loginlink} ${Styles.EmpLogin}`} style={navLinkStyles}>Employee Login </NavLink>
                    <NavLink to="/JobSeekerLogin" className={`${Styles.Loginlink} ${Styles.StuLogin}`} style={navLinkStyles}>Job Seeker Login</NavLink>
                    {/* </div> */}
                  </div>
                </div>
              </div>

            </>

      }

    </>
  )
}
export default Nav;