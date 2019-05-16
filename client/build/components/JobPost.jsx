import React from "react";
import './style.module.css';


const JobPost = (props)=>{
  if(props.job.company.location){
    var location = <div className="company">{props.job.company.location.name}</div>
  };

  return (
    <div className='jobPost'>
      <h4><a href={props.job.apply_url} >{props.job.title}</a></h4>
      <div>
        <div className="company">{props.job.company.name}</div>
        {location}
      </div>
      <div className="description" dangerouslySetInnerHTML={{__html : props.job.description}} />
      <div>
        <h6>Perks</h6>
        <div className="description">{props.job.perks}</div>
      </div>
    </div>
  )

}

export default JobPost;