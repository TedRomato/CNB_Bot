const fs = require('fs');
const editJsonFile = require("edit-json-file");

const state1 = "U"; //UNSOLVED
const state2 = "S"; //SOLVING
const state3 = "C"; //CLOSED

const state1Text = "Looking for solver..."
const state2Text = "This issue is beng solved by: "
const state3Text = "This issue was solved by: "


class Issue{
  constructor(name){
    this.name = name;
    this.ID = JSON.parse(editJsonFile(__dirname + "/Issues.json").get("issues")).length + 1;
    this.awardXP = undefined;
    this.solver = undefined;
    this.state = state1;
    this.xpDrop = 10;
    this.description = undefined;
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
  setAwardXP(awardXP) {
    this.awardXP = awardXP;
  }
  setSolver(solver) {
    this.solver = solver;
  }
  setXPDrop(xpDrop) {
    this.xpDrop = xpDrop;
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
        statusStr = state2Text;
        break;
      case state3:
        statusStr = state3text;
        break;
      default:
        console.log('State is invalid in getIssueAsString.');

    }

    let str = '*Name:* **' + this.name
            + '**\n*Issue ID:* **#' + this.ID
            + '**\n*Points awarded:* **' + this.awardXP + " XP"
            + '**\n*Solver:* **' + statusStr
            + '**\n*Description:* **' + this.description + "**";
    return str;
  }
}

function issueFromNonClass(object){
  let issue = new Issue(object.name);

  issue.setDescription(object.description);
  issue.setAwardXP(object.awardXP);
  issue.setSolver(object.solver);
  issue.setXPDrop(object.xpDrop);
  issue.setID(object.ID);
  return issue;
}


function createIssue(name,awardXP,description){
  let issue = new Issue(name);
  issue.setAwardXP(awardXP);
  issue.setDescription(description);
  let unsolvedIssues = getIssues();
  unsolvedIssues.push(issue);
  saveIssues(unsolvedIssues);
}

function getIssues(){
//  console.log(editJsonFile(__dirname + "/Issues.json").get("issues"));
  let objarr = JSON.parse(editJsonFile(__dirname + "/Issues.json").get("issues"));
  for(let i = 0; i < objarr.length; i++){
    objarr[i] = issueFromNonClass(objarr[i]);
  }
  return objarr;
}

function saveIssues(issues){
  let file = editJsonFile(__dirname + "/Issues.json");
  file.set("issues", JSON.stringify(issues));
  file.save();
}

function getUnsolvedIssues(){
  let issues = getIssues();
  let arr = [];
  for (var i = 0; i < issues.length; i++) {
    if(issues[i].state == state1){
      arr.push(issues[i]);
    }
  }
  return arr;
}

function getIssueFromID(id){
  let issues = getIssues();
  for (var i = 0; i < issues.length; i++) {
    if(issues[i].ID == id){
      return issues[i];
    }
  }
  return null;
}

function changeIssue(changedIssue){
  let issues = getIssues();
  for (var i = 0; i < issues.length; i++) {
    if(issues[i].ID == changedIssue.ID){
      issues[i] = changedIssue;
      saveIssues(issues);
      return true;
    }
  }
  return null;
}


module.exports = {Issue, createIssue, getIssues, getUnsolvedIssues, getIssueFromID, saveIssues, changeIssue};
