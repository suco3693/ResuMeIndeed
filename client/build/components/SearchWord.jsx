import React from 'react';
import $ from 'jquery';
import './style.module.css';

const SearchWord = (props)=>{
  var currentID = props.index
  return (
    <input type='button' onClick={()=>{props.selectKeyword(currentID)}}  id={props.index} className='searchWord' value={props.word}></input>
  )
}

export default SearchWord;