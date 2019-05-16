import React from "react";
import JobPost from "./JobPost.jsx";
import './style.module.css';

const JobPage = (props) =>{
  var jobPostings = props.jobs.map((job)=>
    <JobPost key={props.jobs.indexOf(job)} job={job}/>
  )
  return (
    <div>
      <h4>Matched Jobs</h4>
      <input type="button" className="returnHome" value="Return To Resume Entry" onClick={()=>{props.restart()}}></input>
      <div className='jobCont'>
        {jobPostings}
      </div>
    </div>
    
  )
}

export default JobPage;