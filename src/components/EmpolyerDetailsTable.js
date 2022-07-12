import React, { useState, useEffect } from 'react';
//import { Router, Switch, Route, Link } from "react-router-dom";

import './EmpolyerDetailsTable.css';

const EmpolyerDetailsTable = ({ employerDetails }) => {
    var [jobTitle, setJobTitle] = useState([]);
    
    useEffect(() => {
       async function getSearchWithJobTitle() {
            const response = await fetch(`http://localhost:3000/${jobTitle}`, {
                method: 'get'
            });
           const title = await response.json();
           console.log('title :', title);
           
       }
        console.log('jobTitle :', jobTitle);
        getSearchWithJobTitle();
        console.log('in useEffect')
    },[jobTitle])
    
  return (
    <div className='EmpolyerDetailsTable'>
            <tbody>
                <tr>
                  <th>LCA Case Number</th>
                  <th>H1B Job Title</th>
                  <th>Location (city,state)</th>
                  <th>Base Salary</th>
                  <th>Start Date</th>
                  <th>Prevailing Wage Level</th>
                  <th>Status</th>
                </tr>
                {
                  employerDetails.map((records, i) => (  
                    
                        <tr key={i}>
                            <td>{records.props.children[0]}</td>
                            <td>
                                <a href={records.props.children[1]}>{records.props.children[1]}</a>
                                {/* <Link to={records.props.children[1]}>records.props.children[1]</Link> */}
                            </td>
                            <td>{records.props.children[2]} , {records.props.children[3]}</td>
                            <td>{records.props.children[4]}</td>
                            <td>{records.props.children[5]}</td>
                            <td>{records.props.children[6]}</td>
                            <td>{records.props.children[7]}</td>
                        </tr>    
                    ))
                }
            </tbody>
        </div>
  )
}

export default EmpolyerDetailsTable;