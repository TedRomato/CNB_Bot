const fs = require('fs');
const editJsonFile = require("edit-json-file");
const DataLayer = require(__dirname + "/DataLayer.js");

const state1 = "U"; //UNSOLVED
const state2 = "S"; //SOLVING
const state3 = "C"; //CLOSED

const state1Text = "Looking for solver..."
const state2Text = "This issue is being solved by: "
const state3Text = "This issue was solved by: "


class Issue{
  constructor(){
    this.name = null;
    this.ID = JSON.parse(editJsonFile(__dirname + "/Issues.json").get("data")).length + 1;
    this.awardPoints = null;
    this.solver = null;
    this.state = state1;
    this.description = null;
    this.pointsDrop = 10;
    this.logs = [];
  }
  setState(state){
    if(state == state1 || state == state2 || state == state3){
      this.state = state;
    }else{
      console.log('Tried to change issue.state to invalid value: ' + state);
    }
  }
  setID(id){
    this.ID = id;
  }
  setDescription(des) {
    this.description = des;
  }
  setAwardPoints(awardPoints) {
    this.awardPoints = awardPoints;
  }
  setSolver(solver) {
    this.solver = solver;
  }
  setPointsDrop(pointsDrop) {
    this.pointsDrop = pointsDrop;
  }
  setName(name){
    this.name = name;
  }
  getIssueAsString(){
    let statusStr;
    switch (this.state) {
      case state1:
        statusStr = state1Text;
        break;
      case state2:
        statusStr = state2Text + DataLayer.getDataPieceCondition("Profiles", {"ID":this.solver }).nameTag;
        break;
      case state3:
        statusStr = state3text  + DataLayer.getDataPieceCondition("Profiles", {"ID":this.solver }).nameTag;
        break;
      default:
        console.log('State is invalid in getIssueAsString.');

    }

    let str = '*Name:* **' + this.name
            + '**\n*Issue ID:* **#' + this.ID
            + '**\n*Points awarded:* **' + this.awardPoints
            + '**\n*Points drop:* **' + this.pointsDrop
            + '**\n*Status:* **' + statusStr
            + '**\n*Description:* **' + this.description + "**";
    return str;
  }
}


function DataToIssue(data){
  if(Array.isArray(data)){
    let arr = [];
    for(let i = 0; i < data.length; i++){
      arr.push(singleDataToIssue(data[i]));
    }
    return arr;
  }else{
    return singleDataToIssue(data);
  }
}

function singleDataToIssue(data){
  let issue = new Issue();
  for(let propt in data){
    if(issue.hasOwnProperty(propt)){
      issue[propt] = data[propt];
    }else{
      throw "Issue doesn't have porprety " + propt + " you are trying to assign from JSON_Data";
    }
  }
  return issue;
}


module.exports = {Issue, DataToIssue, state1, state2, state3};
