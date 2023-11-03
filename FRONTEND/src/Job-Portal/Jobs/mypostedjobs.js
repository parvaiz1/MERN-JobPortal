import React from 'react'
import styles from "./myPostedjobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function JoppostedByEmp() {

  // let location = useLocation()
  // let empName= location.state.gserid 

  const [myjobs, setMyjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))

  async function getjobs() {
    await axios.get(`http://localhost:8080/jobpost/getPostedjobs/${empId}`)
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMyjobs(sortedate)

      })
  }
  useEffect(() => {
    getjobs()
  }, [])
  // .................delete function............
  async function deletejob(deleteid) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/jobpost/deleteProduct/${deleteid}`)
          .then((res) => {
            console.log("connected with backend", res.data)
            getjobs()
          })
          .catch((err) => { console.log("failed :", err) })
      }
    })
  }
  function update(id) {
    navigate("/Updatepostedjobs", { state: { getId: id } })
  }

  // ........search ........................search...........................

  async function search(e) {
    let key = e.target.value
    if(key){
        let dubmyjobs=[...myjobs]

    const filteredItems = dubmyjobs.filter((user) =>
    JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
    )
    setMyjobs(filteredItems)
  }else{
    getjobs()
  }
     
    // console.log(key)
    
    // await axios.get(`http://localhost:8080/jobpost/searchJob/${key}`)
    //   .then((res) => {
    //     if (key) {
    //       setMyjobs(res.data)
    //     } else {
    //       getjobs()

    //     }
    //   })

  }

  function seeProfilejobSeekerId(id) {
    window.open(`/Applied-User-Profile/${id}`, '_blank')
  }


  return (
    <>
      {/* <p>{empName}</p> */}
      {/* <textarea /> */}


      <>
        <h3 style={{marginLeft:"2%", color:"blue"}}> You have posted total {myjobs.length} jobs</h3>
         <div className={styles.searchBoth}>
        <p className={styles.p}>Search </p>
        <input className={styles.inputboxsearch} type="text" placeholder='search for a job' onChange={(e) => { search(e) }} />
      </div> 
        {/* <div className={styles.carwrapper}>
        { jobs.map((items,i)=>{ 
          return (      
        <div className={styles.card}>
          <div className={styles.AlltexWrapper}>
            <div className={styles.Titlewrapper} > 
            <h3>Job Title :</h3><h3>{items.jobTitle.toUpperCase()}</h3> 
            </div>
            <p className={styles.text}>Job Location :   {items.jobLocation.toUpperCase()}</p>
            <p className={styles.text}> Package : {items.salaryRange}</p>
            <p className={styles.text}> Experiance Required :{items.experiance}</p>
            <div className={styles.skillsWrapper}>
            <h3 className={styles.text}> Skills Required :</h3><h3>{items.skills}</h3>  
            </div>          
                  <h3>Description:</h3>      
                <p className={styles.description}>{items.jobDescription}</p>                                  
                 
          </div>
          <div className={styles.buttons}>
          <button onClick={()=>{update(items._id) }} className={`${styles.button} ${styles.update}`}>update</button>
          <button onClick={()=>{deletejob(items._id) }} className={`${styles.button} ${styles.delete}`}>delete</button>
          
          </div>
          
        </div>       
        
        )
         })
        }
       </div> */}
        <div className={styles.Uiwarpper}>
          <ul className={styles.ul}>
            <li className={styles.li}><b>Company Name</b></li>
            <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
            <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
            <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b></li>

            <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
            <li className={`${styles.li} ${styles.Package}`}><b>Package </b></li>
            <li className={`${styles.li} ${styles.experiance}`}><b>Exp </b></li>

            <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
            <li className={`${styles.li} ${styles.Action}`}><b>Action</b></li>
            <li className={`${styles.li} ${styles.NuApplied}`}><b>No of JobSeeker Applied</b></li>


          </ul>
          {
            myjobs.length > 0 ?

              myjobs.map((items, i) => {
                return (
                 


                  <ul className={styles.ul}>
                         
                         
                         <li className={styles.li}>{items.Logo ?
                  < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                  : ""}<br></br>{items.companyName}</li>

                    <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
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
                    <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                    <li className={`${styles.li} ${styles.Action}`}>
                      <div className={styles.Acbuttons}>
                        <button onClick={() => { update(items._id) }} className={`${styles.Abutton} ${styles.update}`}>update</button>
                        <button onClick={() => { deletejob(items._id) }} className={`${styles.Abutton} ${styles.delete}`}>delete</button>
                      </div>
                    </li>
                    <li className={`${styles.li} ${styles.NuApplied}`}>
                      {items.jobSeekerId.length > 0 ?
                        <button className={`${styles.viewButton}`} onClick={() => { seeProfilejobSeekerId(items._id) }}>{items.jobSeekerId.length}</button>
                        :
                        <button className={`${styles.viewButton}`} >{items.jobSeekerId.length}</button>

                      }
                    </li>




                  </ul>
                )
              })
              : <p style={{marginLeft:"3%"}}> You have not Posted any job yet click on 'Post Job' to post a job</p>
          }



        </div>




      </>



    </>

  )
}

export default JoppostedByEmp