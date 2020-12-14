const fs = require('fs');
const editJsonFile = require("edit-json-file");
const DataLayer = require(__dirname + "/DataLayer.js");
let moment = require('moment');
const logAward = 5;
const streakMultiplier = 5;


class Log {
  constructor() {
      this.ID = JSON.parse(editJsonFile(__dirname + "/Logs.json").get("data")).length + 1;
      this.profile = null;
      this.issue = null;
      this.date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
      this.content = null;
    }

  getLogInfo(){
    let issueStr;
    try {
      issueStr = "**\n*Issue:* **" + DataLayer.getDataPieceCondition("Issues", {"ID":this.issue }).name + "#" + this.issue;
    } catch (e) {
      issueStr = "";
    }
    let str = "*Profile:* **" + DataLayer.getDataPieceCondition("Profiles", {"ID":this.profile }).nameTag
              + "**\n*Date:* **" + this.date
              + issueStr
              + "**\n*Content:* " + this.content + "";
    return str;
    }
  }

function dataToLog(data){
  if(Array.isArray(data)){
    let arr = [];
    for(let i = 0; i < data.length; i++){
      arr.push(singleDataToLog(data[i]));
    }
    return arr;
  }else{
    return singleDataToLog(data);
  }
}

function singleDataToLog(Data){
  let log = new Log();
  for(let propt in Data){
    if(log.hasOwnProperty(propt)){
      log[propt] = Data[propt];
    }else{
      throw "Log doesn't have porprety " + propt + " you are trying to assign from JSON_Data";
    }
  }
  return log;
}




module.exports = {Log, dataToLog, singleDataToLog, logAward, streakMultiplier};
