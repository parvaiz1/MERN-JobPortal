import React from "react";
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"

// .......importing components......//
import StudentLogin from "./Job-Portal/Login/StudLogin";
import EmployeeLogin from "./Job-Portal/Login/EmpLogin"
import StudentSignUp from "./Job-Portal/SignUp/StudSignin";
import EmployeeSignUp from "./Job-Portal/SignUp/EmplSign";
import StudPrivate from "./Job-Portal/Private/OutletStud";
import PostedJobsbyEmp from "./Job-Portal/Jobs/mypostedjobs";
import EmpPrivate from "./Job-Portal/Private/OuletEmp";
import PostJobs from "./Job-Portal/PostJobs/postJobs";
import Jobs from "./Job-Portal/Jobs/AllJobs";
import Nav from "./Job-Portal/NaveBar/Nav";
import Jobdetails from "./Job-Portal/Jobs/AllJobdetails"
import Home from "./Job-Portal/Jobs/AllHomeJobs";
import StudentUpdateProfile from "./Job-Portal/Profile/StudentUpdateProfile";
import EmployeeUpdateProfile from "./Job-Portal/Profile/EmployeeUpdateProfile";
import StudentProfile from "./Job-Portal/Profile/StudentProfile";
import EmployeeProfile from "./Job-Portal/Profile/EmployeeProfile";
import UpdatePostedJobs from "./Job-Portal/PostJobs/updatePostedJobs";
import MyAppliedJobs from "./Job-Portal/Jobs/MyAppliedJobs"
import AppliedUserProfile from "./Job-Portal/AppliedUserProfile/AppliedUserProfile";
import CheckStudentProfiel from "./Job-Portal/Profile/CheckStudentProfiel";


const App = () => {

  const AppContext = createContext()

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />

                {/* ..........Private component for Employee i,e can not search in URL......... */}       
                 <Route element={<EmpPrivate />} >
                   <Route path="/PostJobs" element={<PostJobs />} />
                   <Route path="/postedjobs" element={<PostedJobsbyEmp />} />
                   <Route path="/Updatepostedjobs" element={<UpdatePostedJobs />} />
                   <Route path="/Applied-User-Profile/:jid" element={<AppliedUserProfile />} />
                   <Route path="/Check-Profile/:CP" element={<CheckStudentProfiel />} />
                   <Route path="/UpdateProfile" element={<EmployeeUpdateProfile />} />
                   <Route path="/MyProfile" element={<EmployeeProfile />} />
       
                 </Route>
                 {/* ..........Private component for Jobseeker i,e can not search in URL......... */}       
                 <Route element={<StudPrivate />} >
                   <Route path="/alljobs" element={<Jobs />} />
                   <Route path="/Update-Profile" element={<StudentUpdateProfile />} />
                   <Route path="/My-Profile" element={<StudentProfile />} />
                   <Route path="/My-Applied-Jobs" element={<MyAppliedJobs />} />
       
                 </Route>

          <Route path="/JobSeekerLogin" element={<StudentLogin />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route path="/JobSeekerSignUp" element={<StudentSignUp />} />
          <Route path="/EmployeeSignUp" element={<EmployeeSignUp />} />
          <Route path="/JobDetails/:id" element={<Jobdetails />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
// export {AppContext}