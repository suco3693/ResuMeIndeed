import React from "react";
import $ from "jquery";
import Upload from "./uploadPage.jsx";
import Keywords from "./keywords.jsx";
import JobPage from "./JobPage.jsx";

class mainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      keywords : null,
      mykeywords: [],
      resumeWordCount : {},
      selectedKeywords:[],
      jobPosts : [],
      mode : 'upload'
    };
    this.setState = this.setState.bind(this);
    this.submitFile = this.submitFile.bind(this);
    this.getKeywords= this.getKeywords.bind(this);
    this.findKeywords=this.findKeywords.bind(this);
    this.keywordMatch = this.keywordMatch.bind(this);
    this.selectKeyword = this.selectKeyword.bind(this);
    this.searchJobs = this.searchJobs.bind(this);
    this.addSearch = this.addSearch.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount(){
    this.getKeywords()
  }
  getKeywords(){
    $.ajax({
      type: 'GET',
      url : 'api/keywords/',
      success: (keywords)=>{
        this.setState({keywords : keywords})
      },
      error : (err)=>{
        console.log(err)
      }
    })
  }
  searchJobs(){
    if(this.state.selectedKeywords.length > 0){
      this.setState({mode : 'working'})
      const searchBody = {
        'keywords' : this.state.selectedKeywords
      }
      $.ajax({
        type: 'POST',
        url : 'api/searchJobs',
        data : searchBody,
        success : (jobPosts)=>{
          jobPosts=JSON.parse(jobPosts).listings.listing;
          this.setState({jobPosts : jobPosts},()=>{
            this.setState({mode : 'jobpage'});
          });
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }


  submitFile () {
    let fileReader;
    var handleRead = (e)=>{
      let contentLines = fileReader.result.split("\n");
      this.findKeywords(contentLines);
    }
    handleRead=handleRead.bind(this);
    fileReader= new FileReader;
    fileReader.onloadend = handleRead;
    fileReader.readAsText(document.getElementById('resumeUpload').files[0]);
  }

  findKeywords(resumeLines){
    var wordCount={};
    var line;
    for(var lineIndex=0; lineIndex <resumeLines.length; lineIndex++){
      line=resumeLines[lineIndex]
      var wordArray= line.split(" ");
      wordArray.forEach(word => {
        word=word.replace(/[^a-z\\-\\#\\+\\@]+/gi,'');
        if(wordCount[word] === undefined){
          wordCount[word] = 1;
        } else {
          wordCount[word] = wordCount[word] + 1;
        }
      });
    }
    this.setState({resumeWordCount : wordCount})
    this.setState({mode : 'keywords'});
    this.keywordMatch();
  }

  keywordMatch(){
    var resumeWords=Object.keys(this.state.resumeWordCount);
    var keywordSet = [];
    var matchKeywords =[];
    this.state.keywords.forEach(keyword =>{
      keywordSet.push(keyword.keyword);
    })
    resumeWords.forEach(word=>{
      if(keywordSet.indexOf(word) !== -1){
        matchKeywords.push(word);
      }
    })
    this.setState({mykeywords : matchKeywords })
  }
  addSearch(searchTerm){
    var mykeywords = this.state.mykeywords;
    $('#searchInput').val("");
    if(mykeywords.indexOf(searchTerm) === -1){
      mykeywords.push(searchTerm);
      this.setState({mykeywords : mykeywords},()=>{
        $(`#${keywordID}`).css('background-color','#aad4aa');
        // this.setState({mykeywords : mykeywords})
        this.forceUpdate();
      });
      var selectedKeywords =this.state.selectedKeywords;
      selectedKeywords.push(searchTerm);
      this.setState({selectedKeywords: selectedKeywords});
    }
  }
  selectKeyword(keywordID){
    
    var selectedKeywords =this.state.selectedKeywords;
    var keyword =this.state.mykeywords[keywordID]
    if(selectedKeywords.indexOf(keyword) === -1 || keyword === ''){
      $(`#${keywordID}`).css('background-color','#aad4aa');
      selectedKeywords.push(keyword)
      this.setState({selectedKeywords: selectedKeywords});
    } else {
      $(`#${keywordID}`).css('background-color','aliceblue');
      selectedKeywords.splice(selectedKeywords.indexOf(keyword),1);
    }
  }

  
  restart(){
    this.setState({mode : 'upload'})

    this.setState({selectedKeywords: []})
  }

  render () {
    if(this.state.mode === 'upload'){
      return (
        <Upload submitFile={this.submitFile} />
      )
    } else if( this.state.mode === 'working'){
      return (
        <img src="https://i.imgflip.com/306cgo.jpg" title="made at imgflip.com"/>
      )
    } else if (this.state.mode === 'keywords'){
      return (
        <Keywords addSearch={this.addSearch} keywords={this.state.mykeywords} selectKeyword={this.selectKeyword} searchJobs={this.searchJobs}/>
      )
    } else if (this.state.mode === 'jobpage'){
      return (
        <JobPage jobs={this.state.jobPosts} restart={this.restart}/>
      )
    }
  }
}


export default mainPage;