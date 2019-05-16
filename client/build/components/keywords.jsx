import React from "react";
import $ from "jquery";
import SearchWord from "./SearchWord.jsx";
import './style.module.css';

const Keywords = (props) =>{
  var keywords = props.keywords.map((word)=>
    <SearchWord key={props.keywords.indexOf(word)}  index={props.keywords.indexOf(word)} word={word} selectKeyword={props.selectKeyword} />
  )
  return (
    <div>
      <h4>Keyword Matches</h4>
      <span>Please select the ones you want to search</span>
      <div className='searchWordCont'>
        {keywords}
      </div>
      <div> 
        <input type="text" id='searchInput' placeholder="Add other search terms"></input>
        <input type="button" value="Add Search Term" onClick={()=>{props.addSearch($('#searchInput').val())}}></input>
      </div>
      
      <input type='button' className='SearchButton' value='Search for Jobs' onClick={()=>{props.searchJobs()}}></input>
    </div>
    
  )
}

export default Keywords;