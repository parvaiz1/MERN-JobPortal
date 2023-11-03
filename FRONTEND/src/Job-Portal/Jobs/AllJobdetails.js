import React from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Jobdetails() {
  const [jobs, setJobs] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  console.log("use state", jobs)

  const navigate = useNavigate()

  let params =  useParams();
 
  async function getjobs() {
    await axios.get(`http://localhost:8080/jobpost/getjobs/${params.id}`)
      .then((res) => {
        let result = (res.data)
        console.log(result)
        setJobs(result)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])
  function showless(){
    navigate("/alljobs")
  }
 
  return (
    <>
      {/* <div className={styles.detailedcarwrapper}>
        <div className={styles.detailedcard}>
          <div className={styles.AlltexWrapper}>
            <p className={styles.text}>Job Title :{jobs.jobTitle}</p>
            <p className={styles.text}>Job Location:</p><h4>{jobs.jobLocation}</h4>
            <p className={styles.text}> Package : {jobs.salaryRange}</p>
            <p className={styles.text}> Experiance Required :{jobs.experiance}</p>
            <p className={styles.text}> Skills Required :{jobs.skills}</p>            
            <div className={styles.descriptionAndApply}>              
                <p className={styles.detaileddescription}>
                  {jobs.jobDescription}
                  <p className={styles.showLess} onClick={showless}>...show less</p>
                   </p>         
              <button className= {styles.button} >Apply</button>
            </div>
          </div>
        </div>
        
      </div> */}

<div className={styles.dUiwarpper}>
      <ul className={styles.Hul}>
      <li className={styles.Hli}><b>Company Name</b></li>
        <li className={styles.Hli}><b>Job Title</b></li>
        <li className={styles.Hli}><b>Location</b></li>
        <li className={styles.Hli}><b>Package </b></li>
        <li className={styles.Hli}><b>Experiance Required</b></li>
        <li className={styles.Hli}><b>Skills Required</b></li>
        <li className={styles.Hli}><b>Posted Date</b></li>
        <ul className={`${styles.DUIli}`}>
       <li className={`${styles.Dli}`}><b>Job Description:</b></li>
       <li className={`${styles.RDli} `}> { jobs.jobDescription}
      <span className={styles.showLess} onClick={showless}>...show less</span></li>
       </ul>
      </ul>

      <ul className={styles.Rul}>        
      <li className={styles.Rli}>{jobs.companyName}</li>

        <li className={styles.Rli}>{jobs.jobTitle}</li>
        <li className={styles.Rli}>{jobs.jobLocation}</li>
        <li className={styles.Rli}>{jobs.salaryRange}</li>
        <li className={styles.Rli}>{jobs.experiance}</li>
        <li className={styles.Rli}>{jobs.skills}  </li>
        <li className={styles.Rli}>
        {      new Date(jobs.updatedAt).toLocaleString(
  "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
)}
        </li>

      </ul>
      
       </div>
      

    </>

  )
}

export default Jobdetails