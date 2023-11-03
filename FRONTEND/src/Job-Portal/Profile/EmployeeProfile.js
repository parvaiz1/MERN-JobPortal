import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import Companylogo from "../img/logo.png"



function EmployeeProfile() {

    const [profileData, setProfileData] = useState([])

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))


    async function getProfile() {
        await axios.get(`http://localhost:8080/EmpProfile/getProfile/${empId}`)
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
        <img className={styles.EmpImage} src={item.image?item.image : Companylogo}/>
        
        </div>
    )

})
    }
            {/* <button onClick={getProfile}></button> */}
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email  Id</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar Id</b></li>
                <li className={styles.li}><b>Pan Card ID</b></li>
                <li className={styles.li}><b>Company Email id</b></li>
                <li className={styles.li}><b>Company GSTIN</b></li>
                <li className={styles.li}><b>Company Website</b></li>
                <li className={styles.li}><b>Company Address</b></li>
                <li className={styles.li}><b>Type of Organisation</b></li>
               
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
                         {item.age?              <li className={` ${styles.Hli}`}>{item.CompanyEmail}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Company Email yet</li>}
                         {item.NoticePeriod?     <li className={` ${styles.Hli}`}>{item.CompanyGSTIN}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  CompanyGSTIN yet</li>}
                         {item.ExpectedSalary?   <li className={` ${styles.Hli}`}>{item.CompanyWebsite}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Company Website yet</li>}
                         {item.currentCTC?       <li className={` ${styles.Hli}`}>{item.CompanyAddress}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated CompanyAddress yet</li>}
                         {item.Qualification?    <li className={` ${styles.Hli}`}>{item.TypeofOrganisation}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Organisation Type yet</li>}
                        
                        </ul>
                    )
                })

            }
            </div>

        </>
    )
}

export default EmployeeProfile