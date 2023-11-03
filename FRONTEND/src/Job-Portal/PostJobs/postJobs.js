import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Companylogo from "../img/logo.png"


import Style from "./postJobs.module.css"

function PostJobs() {
    let empId = JSON.parse(localStorage.getItem("EmpIdG"))
 
    const [jobTitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobtype, setJobtype] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [jobLocation, setJobLocation] = useState("")
    const [qualification, setQualification] = useState("")
    const [experiance, setExperiance] = useState("")
    const [skills, setSkills] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[others, setOthers] = useState("")
    const[Logo, setLogo] = useState()

    async function getLogo() {
        await axios.get(`http://localhost:8080/EmpProfile/getLogo/${empId}`)
            .then((res) => {
                let result = res.data
                console.log(result)
                setLogo(result)
            }).catch((err) => {
                console.log("api issue")
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getLogo()
    }, [])

    // useEffect(()=>{

    // },[successMessage])

    // useEffect(()=>{

    // },[errorMessage])



    async function postJob(){
    console.log(" before send to backend" ,Logo, jobTitle, companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills)
    await axios.post("http://localhost:8080/jobpost/jobpost/",{Logo, empId, jobTitle, companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills})
    .then((res)=>{
        let result = (res.data)
        console.log(result)
        if(result=="success"){
            setJobTitle("")
            setJobDescription("")
            setCompanyName("")
            setSalaryRange("")
            setJobLocation("")
            setExperiance("")
            setExperiance("")
            setSkills("")
            setSuccessMessage("Success! job successfully posted")
        }
        else if(result=="field are missing"){
            setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
        }
    }).catch((err)=>{
        alert("server issue occured", err)
    })
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}

    return (
        <>
        
            {/* <h1>post jobs</h1> */}
          {Logo? <img  className={Style.logo} src={Logo} /> :
          <p style={{color:"red" ,marginLeft:"5%", fontStyle:"italic"}}> Alert! You have not updated the Company log, please update the company Logo</p>}
<h3 style={{ color:"blue", marginLeft:"15%"}}>Welcome to Post job Page, Post a Job and get Connected with Job Seekers</h3>

            <div className={Style.postJobPageWrapper}>


                <div className={Style.postJobWrapper}>
                <p className={Style.successmessage}>{successMessage} </p>
                {/* <p className={Style.errormessage}>{errorMessage} </p> */}
               


                    <h4 className={Style.jobHeadline}  >Job title**</h4>
                    <input className={Style.inputbox} type="text" value={jobTitle} onChange={(e) => { setJobTitle(e.target.value) }}  />

                    <h4 className={Style.jobHeadline}>Company Name**</h4>
                    <input className={Style.inputbox} type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />


                    <h4 className={Style.jobHeadline}>Job Description**</h4>
                    <input className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Type</h4>
                    {/* <select className={Style.inputbox} onChange={(e) => { setJobtype(e.target.value) }}>
                        <option value="" >Select Job Type</option>
                        <option value="Full Time" >Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select> */}
                    <label><input name="Job-Type" type="radio" value ="Full Time " onChange={(e) => { setJobtype(e.target.value) }}/>Full Time  </label>
                    <label><input name="Job-Type" type="radio" value ="Part Time" onChange={(e) => { setJobtype(e.target.value) }}/>Part Time  </label>
                    <label><input name="Job-Type" type="radio" value ="Internship" onChange={(e) => { setJobtype(e.target.value) }}/>Internship </label>
                    <label><input name="Job-Type" type="radio" value ="Contract" onChange={(e) => { setJobtype(e.target.value) }}/>Contract   </label>


                    <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                    <input maxlength="3" className={Style.inputbox} type="text" value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Location**</h4>
                    <input maxLength="3" className={Style.inputbox} type="text" value={jobLocation} onChange={(e) => { setJobLocation(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Qualification Needed**</h4>

                    <label><input name="Qualification" type="radio" value ="B.E/CSE" onChange={(e) => { setQualification(e.target.value) }}/>B.E/CSE </label>
                    <label><input name="Qualification" type="radio" value ="B.E/Civil" onChange={(e) => { setQualification(e.target.value) }}/>B.E/Civil </label>
                    <label><input name="Qualification" type="radio" value ="B.E/Mech" onChange={(e) => { setQualification(e.target.value) }}/>B.E/Mech </label>
                    <label><input name="Qualification" type="radio" value ="B.E/ECE" onChange={(e) => { setQualification(e.target.value) }}/>B.E/ECE </label>
                    <label><input name="Qualification" type="radio" value ="B.E/IT"  onChange={(e) => { setQualification(e.target.value) }}/>B.E/IT </label>
                    <label><input name="Qualification" type="radio" value ="others" onChange={(e) => { setOthers(e.target.value) }}/>others </label>
                    {
                        others ==="others"?
                    <input className={Style.inputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                        :""

                    }


                    <h4 className={Style.jobHeadline}>Experiance Needed** &nbsp;<span className={Style.hint}>(e.g 5Y or 10Y)</span></h4>
                    <input maxLength="3" className={Style.inputbox} type="text" value={experiance} onChange={(e) => { setExperiance(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Skills Needed**</h4>
                    <input className={Style.inputbox} type="text" value={skills} onChange={(e) => { setSkills(e.target.value) }} />
                    {Logo?<p ><span style={{color:"blue"}}>Note** :</span> Logo will also be posted with the Job</p>:""}

                    <button className={Style.button} onClick={postJob}>Post Job</button>

                </div >
            </div >
        </>

    )
}

export default PostJobs