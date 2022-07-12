import React, { useState, useEffect } from 'react';
import './CompanyList.css';
import EmpolyerDetailsTable from './EmpolyerDetailsTable';

const CompanyList = () => {
    const [companyNameList, setCompanyNameList] = useState([]);
    const [employerName, setEmployerName] = useState();
    const [employerDetails, setEmployerDetails] = useState([]);

    useEffect(() => {
        async function getcompanyNameList() {
            const response = await fetch('http://localhost:3000/companies', {
                method: 'get'
            });
            const clist = await response.json();
            setCompanyNameList(
                clist.map(({ employer_name }) => ({
                    employerName: employer_name
                }))
            )
        }
        getcompanyNameList();
    }, []);

    useEffect(() => {
        async function getEmployerDetails() {
            const response = await fetch(`http://localhost:3000/employer/${employerName}`, {
                method: 'get'
            });
            const employerDetailsList = await response.json();
            const employer = employerDetailsList.map(records => {
                    return (
                        <div>
                            {records.case_number}
                            {records.job_title}
                            {records.employer_city}
                            {records.employer_state}
                            {records.prevailing_wage}
                            {records.begin_date}
                            {records.pw_wage_level}
                            {records.case_status}
                        </div>
                    )
                })
                if (employer) {
                     setEmployerDetails(employer);
                }    
        }
        getEmployerDetails();
    }, [employerName]);
    
    return (
        <>
            <div className='companyContainer'>
                <label >Comapany Name </label>
                <select value={employerName} onChange={e => setEmployerName(e.currentTarget.value)}>
                    <option>--Select Comapany--</option>
                    {
                        companyNameList.map(({employerName}) => (
                            <option value={employerName}>
                                {employerName}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div>
                <EmpolyerDetailsTable employerDetails={employerDetails}/>
            </div>
        </>
    )
}
export default CompanyList;