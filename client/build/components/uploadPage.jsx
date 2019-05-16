import React from "react";
import './style.module.css';

const uploadPage = (props) =>{
  return (
    <div className="upload">
      <label for='resumeUpload'className="spaceUpload" >Please Upload a Plain text (.txt) Resume</label>
      <input type='file' className="spaceUpload" id='resumeUpload' accept ='.txt'></input>
      <input type="button" className="spaceUpload" onClick={()=>props.submitFile()} value="Submit Resume"></input>
    </div>
  )
}

export default uploadPage;