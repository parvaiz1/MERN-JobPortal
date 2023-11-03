import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import profileDp from "../img/user_3177440.png"

function StudentProfile() {

    const [profileData, setProfileData] = useState([])

    let studId = JSON.parse(localStorage.getItem("StudId"))

    async function getProfile() {
        await axios.get(`http://localhost:8080/StudentProfile/getProfile/${studId}`)
            .then((res) => {
                let result = res.data.result
                console.log(result)
                setProfileData([result])
            }).catch((err) => {
                console.log("api issue")
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
        <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"50%"}}>My Profile</h3>
         {

profileData.map((item, i) => {
    return (
        <div key={i}>
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )

})
    }
            {/* <button onClick={getProfile}></button> */}
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email Address</b></li>
                <li className={styles.li}><b>Phone Number</b></li>
                <li className={styles.li}><b>Aadhar Id</b></li>
                <li className={styles.li}><b>Pan Card Id</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experiance</b></li>

            </ul>

            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name}</li>
                            <li className={`${styles.Hli}`}>{item.email}</li>
                      {item.phoneNumber?         <li className={` ${styles.Hli}`}>{item.phoneNumber}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your phone Number yet</li>}
                         {item.Aadhar?           <li className={` ${styles.Hli}`}>{item.Aadhar}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Aadhar Id yet</li>}
                         {item.panCard?          <li className={` ${styles.Hli}`}>{item.panCard}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your pan Id yet</li>}
                         {item.age?              <li className={` ${styles.Hli}`}>{item.age}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your age yet</li>}
                         {item.NoticePeriod?     <li className={` ${styles.Hli}`}>{item.NoticePeriod}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your NoticePeriod yet</li>}
                         {item.ExpectedSalary?   <li className={` ${styles.Hli}`}>{item.ExpectedSalary}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Expected Salary yet</li>}
                         {item.currentCTC?       <li className={` ${styles.Hli}`}>{item.currentCTC}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your current CTC yet</li>}
                         {item.Qualification?    <li className={` ${styles.Hli}`}>{item.Qualification}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Qualification yet</li>}
                         {item.Skills?           <li className={` ${styles.Hli}`}>{item.Skills}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Skills yet</li>}
                         {item.Experiance?       <li className={` ${styles.Hli}`}>{item.Experiance}</li>:  <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your experiance yet</li> }

                        </ul>
                    )
                })

            }
            </div>

        </>
    )
}

export default StudentProfile