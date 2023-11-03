import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Home() {
  const [jobs, setJobs] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/postedjobs")
    }
  }, [])

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  }, [])



  // let menuRef = useRef();
  // let imgRef = useRef();

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current && e.target !== imgRef.current) {
  //     setshowJobs(false)
  //   }
  // })
  async function getjobs() {
    await axios.get("https://deploy-mern-api-two.vercel.app/jobpost/getjobs/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  async function applyforJob(id) {
    navigate("/JobSeekerLogin", { state: { Jid: id } })
  }

  // ...................search..........

  async function search(e) {
    let key = e.target.value
    console.log(key)

    await axios.get(`http://localhost:8080/jobpost/searchJob/${key}`)
      .then((res) => {
        if (key) {
          setJobs(res.data)
        } else {
          getjobs()

        }
      })
  }

  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)

  }

  function sortbyNewjobs() {
    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setJobs(newjobSort)

  }



  function SdescendingOrder() {
    let newJobs = [...jobs]
    const desendSort = newJobs.sort(function (a, b) {
      return (
        b.salaryRange - a.salaryRange
      )
    }
    )
    setJobs(desendSort)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    const AscendSort = newJObs.sort(function (a, b) {
      return (
        a.salaryRange - b.salaryRange
      )
    })
    setJobs(AscendSort)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    const descend = newjob.sort(function (a, b) {
      return (
        b.experiance - a.experiance
      )
    })
    setJobs(descend)
  }

  function EascendingOrder() {
    let newjob = [...jobs]
    const Ascend = newjob.sort(function (a, b) {
      return (
        a.experiance - b.experiance
      )
    })
    setJobs(Ascend)
  }

  return (
    <>
      <h3 style={{ color: " rgb(55, 16, 92)", marginLeft: "2%" }}>Welcome to the Home Page of Blue Impulse</h3>
      <h3 style={{ color: " rgb(55, 16, 92)", marginLeft: "2%" }}>Sign In to Explore more</h3>

      {/* <h3>Home page</h3> */}
      {/* <h3> there are total {jobs.length} jobs</h3> */}

      {/* <div className={styles.carwrapper}>
        { jobs.map((items,i)=>{ 
          return (      
        <div className={styles.card}>
          <div className={styles.AlltexWrapper}>
            <p className={styles.text}>Job Title :{items.jobTitle}</p>
            <p className={styles.text}>Job Location:</p><a>{items.jobLocation.toUpperCase()}</a>
            <p className={styles.text}> Package : {items.salaryRange}</p>
            <p className={styles.text}> Experiance Required :{items.experiance}</p>
            <p className={styles.text}> Skills Required :{items.skills}</p>            
            <div className={styles.descriptionAndApply}>              
                <p className={styles.description}>
             ......... {items.jobDescription} ........
                  { items.jobDescription.slice(0, 60)}
                  <span onClick={()=> navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                    ...read more
                  </span>
                </p>         
              <button className= {styles.button} onClick={applyforJob}>Apply </button>
            </div>
          </div>
        </div>
        )
         })
        }
      </div> */}

      <div className={styles.searchBoth}>
        <p className={styles.p}>Search </p>
        <input className={styles.inputboxsearch} type="text" placeholder='search for a job' onChange={(e) => { search(e) }} />
      </div>
      <div className={styles.HeadingSort}>

        <p className={styles.p} onClick={() => { setshowJobs((prev) => !prev) }}  ><b>Job Posted Date <i className={`${styles.arrow} ${styles.down}`}></i></b></p >
        {showJobs ?
          <>
            <div className={styles.radioWrapper}  >

              <label><input className={styles.radio} type="radio" name="Job" onClick={sortbyOldjobs} />Show old</label>
              <label><input className={styles.radio} type="radio" name="Job" onClick={sortbyNewjobs} />Show latest</label>
            </div>
          </>
          : ""
        }

        <p className={styles.p} onClick={() => { setshowExperiance((prev) => !prev) }}><b>Experiance Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>
        {showExperiance ?
          <>
            <div className={styles.radioWrapper}>
              <label><input className={styles.radio} type="radio" name="Experiance" onClick={SdescendingOrder} />Hight-Low</label>
              <label><input className={styles.radio} type="radio" name="Experiance" onClick={SascendingOrder} />Low-High</label>
            </div>
          </>
          : ""
        }

        <p className={styles.p} onClick={() => { setshowPackage((prev) => !prev) }}><b>Package Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>
        {showPackage ?
          <>
            <div className={styles.radioWrapper}>
              <label><input className={styles.radio} type="radio" name="Package" onClick={EdescendingOrder} />High-Low</label>
              <label><input className={styles.radio} type="radio" name="Package" onClick={EascendingOrder} />Low-High</label>
            </div>
          </>
          : ""
        }

      </div>
      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li className={styles.li}><b>Company Name</b></li>
          <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
          <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

          <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
          <li className={`${styles.li} ${styles.date}`}><b>Posted Date</b>

          </li>

          <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
          <li className={`${styles.li} ${styles.Package}`}><b>Package </b>

          </li>
          <li className={`${styles.li} ${styles.experiance}`}><b>Exp</b>

          </li>
          <li className={`${styles.li} ${styles.qualification}`}><b>Qualif</b></li>


          <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
          <li className={styles.li}><b>Apply</b></li>

        </ul>
        {
          jobs.map((items, i) => {
            return (

              <ul className={styles.ul}>

                <li className={styles.li}>{items.Logo ?
                  < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                  : ""}<br></br>{items.companyName}</li>

                <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                <li className={`${styles.li} ${styles.liDescription}`}> {items.jobDescription.slice(0, 100)}
                  <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                    ...read more
                  </span>
                </li>
                <li className={`${styles.li} ${styles.date}`}>
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
                <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>

                <li className={styles.li}>
                  <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply</button>

                </li>



              </ul>
            )
          })

        }


      </div>

    </>

  )
}

export default Home
