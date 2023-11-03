import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./MyAppliedJobs.module.css"

import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function AppledJobs() {

    const [MyAppliedjob, setMyAppliedjob] = useState([])
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  

//   async function getAppliedJob(){   
//     await axios.get(`http://localhost:8080/jobpost/getAppliedjobs/${ jobSeekerId }`)
//     .then((res)=>{
//       console.log("got user",res.data)
//       // setAppliedUser(res.data)

//     })
// }

// useEffect(()=>{
//   getAppliedJob()
// },[])

    
    async function getjobs() {
      await axios.get(`http://localhost:8080/jobpost/getMyAppliedjobs/${jobSeekerId}`)
        .then((res) => {
          let result = (res.data)
          console.log(result)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMyAppliedjob(sortedate)
        })
    }
  
    useEffect(() => {
      getjobs()
    }, [])

    async function UndoApply(id){
      console.log(id)
      await axios.put(`http://localhost:8080/jobpost/updatforUndoJobApplied/${id}`,{jobSeekerId})
      .then((res)=>{
        console.log(res)
      getjobs()
      }).catch((err)=>{
        console.log("server error occured",err)

        alert("server error occured")
      })

    }

  return (
    <>
    <h3 className={styles.h3}>My applied Jobs</h3>
    <h3 className={styles.h3}>you have total {MyAppliedjob.length} applied jobs</h3>
    <div className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={styles.li}><b>Company Name</b></li>
                <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
                <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

                <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b></li>

                <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
                <li className={`${styles.li} ${styles.Package}`}><b>Salary /Year </b></li>
                <li className={`${styles.li} ${styles.experiance}`}><b>Exp </b></li>
                <li className={`${styles.li} ${styles.Qualif}`}><b>Qualif </b></li>

                <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
                <li className={`${styles.li} ${styles.DeleteAction}`}><b>Action</b></li>
                <li className={`${styles.li} ${styles.Status}`}><b>Status</b></li>


              </ul>
              {
     MyAppliedjob.length > 0 ?

                MyAppliedjob.map((items, i) => {
                  return (

                    <ul className={styles.ul}>

                      <li className={styles.li}>{items.companyName}</li>
                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      <li className={`${styles.li} ${styles.liDescription}`}> {items.jobDescription}

                      </li>
                      <li className={`${styles.li} ${styles.Pdate}`}>
                        {new Date(items.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li>
                      <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                <li className={`${styles.li} ${styles.Qualif}`}>{items.qualification} </li>

                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                     <li  className={`${styles.li} ${styles.DeleteAction}`}>
                      <button className={styles.DeleteButton} onClick={()=>{UndoApply(items._id)}}>Delete</button></li>
                      <li className={`${styles.li} ${styles.Status}`}>
                        {
                        items.onHoldJobseker.find((onholdProfile)=>{
                          return(
                            onholdProfile ==jobSeekerId
                          )
                        })?<p style={{color:"blue"}}>HR has put Your Profile on Hold</p>:""
                      }
                      {
                        items.slectedJobseker.find((SelectedProfile)=>{
                          return(
                            SelectedProfile==jobSeekerId
                          )
                        })?<p style={{color:"rgb(7, 161, 7)"}}>Congrates! Your profile has been selected, HR will get in touch with You very shortly</p>:""
                        }
                        {
                          items.rejectedJobseker.find((rejectProfile)=>{
                            return(
                            rejectProfile==jobSeekerId
                            )
                          })?<p style={{color:"red"}}>Sorry! Your profile has not been Matched for this job</p>:""
                        }
                      </li>

                          </ul>
                  )
                })
              : " you have not applied any jobs yet"

              }


            </div>
    </>
  )
}

export default AppledJobs