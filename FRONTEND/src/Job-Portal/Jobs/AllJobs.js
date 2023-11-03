import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner"

function AllJobs(props) {

  const [jobs, setJobs] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  const [jobapplied, setjobapplied] = useState(false)
  const [userProfile, setuserProfile] = useState([])
  const [showPosteddateJobs, setshowPosteddateJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [Loader, setLoader] = useState(false)
  const [clickedJobId, setclickedJobId] = useState() //for single job loader

  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))


  // let menuRef = useRef();
  // let imgRef = useRef();

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current) {
  //     setshowPosteddateJobs(false)
  //     console.log(menuRef.current)
  //   }
  // })



  const navigate = useNavigate()
  const Location = useLocation()


  async function getjobs() {
    await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        console.log(res)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }

  useEffect(() => {
    getjobs()
  }, [])


  async function applyforJob(jobId) {
    console.log(jobId)

    setclickedJobId(jobId)
    setLoader(true)
    setTimeout(async () => {

      await axios.put(`http://localhost:8080/jobpost/updatforJobApply/${jobId}`, { jobSeekerId })
        .then((res) => {
          setLoader(false)
          getjobs()

        }).catch((err) => {
          alert("server issue occured", err)
        })
    }, 1000)
  }

  async function search(e) {
    let key = e.target.value
    console.log(key)
    //     const newjobs = [...jobs]
    // const filter= newjobs.filter((filtereditem)=>{
    //   return(
    //   filtereditem.jobTitle==key
    //   )
    // })
    // console.log(filter)
    // setJobs(filter)
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
      {/* {Location.state.name} */}
      {/* <h3> there are total {jobs.length} jobs</h3> */}
      {/* 
      <div className={styles.carwrapper}>

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
                  {items.jobDescription}
                  { items.jobDescription.slice(0, 60)}
                  <span onClick={()=> navigate(`/Jobdetails/${items._id}`)  } className={styles.seeMore}>
                    ...read more
                  </span>
                </p>         
              <button className= {styles.button} onClick={()=>{applyforJob(items._id)}}>Apply</button>
            </div>
          </div>
        </div>
        )
         })
        }
      </div> */}


      <div className={styles.searchBoth}>
        <p className={styles.p}>Search </p>
        <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job/Skills/Location/Experiance' onChange={(e) => { search(e) }} />
      </div>
      <div className={styles.HeadingSort}>

        <p className={styles.p} onClick={() => { setshowPosteddateJobs((prev) => !prev) }}  ><b>Job Posted Date <i className={`${styles.arrow} ${styles.down}`}></i></b></p >
        {showPosteddateJobs ?
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
          <li className={`${styles.li} ${styles.date}`}><b>Posted Date</b> </li>
          <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
          <li className={`${styles.li} ${styles.Package}`}><b>Package </b> </li>
          <li className={`${styles.li} ${styles.experiance}`}><b>Exp</b></li>
          <li className={`${styles.li} ${styles.qualification}`}><b>Qualif</b></li>
          <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
          <li className={styles.li}><b>Status</b></li>

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

                  {items.jobSeekerId.find((jobseeker) => {
                    return (
                      jobseeker == jobSeekerId
                    )
                  }) ?
                    <button className={styles.Appliedbutton} > Applied <span style={{ fontSize: '16px' }}>&#10004;</span></button>
                    :
                    <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply
                      <span className={styles.Loader} >{Loader && items._id == clickedJobId ?
                        <TailSpin color="white" height={20} />
                        : ""}</span></button>
                  }

                </li>



              </ul>
            )
          })

        }


      </div>

    </>

  )
}

export default AllJobs