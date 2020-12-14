const DataLayer = require(__dirname + '/DataLayer');

class Achivement{
  /* parameters are passed like ->examples [{name:"Full stack of logs",parameter:"Logs",value:64, type:'E'}] => E stands for equal B stands for bigger than */
  constructor(name, parameter, value, arrLength){
    this.ID = DataLayer.getData("Achivements").length + 1;
    this.name = name;
    this.parameter = parameter;
    this.arrLength = arrLength;
    this.value = value;
  }
  checkIfAchived(profile){
    if(this.arrLength){
      if(!(profile[this.parameter].length >= this.value)){
        return false;
      }
    }else{
      if(this.parameter == 'rank'){
        if(!(profile[this.parameter] == this.value)){
          return false;
        }
      }else{
        if(!(profile[this.parameter] >= this.value)){
          return false;
        }
      }
    }
    return true;
  }
  getInfo(){
    let al = "";
    if(this.arrLength){
      al = " Amount"
    }
    let str = "*Name:* **" + this.name
            + "**\n*Requirement:* **" + this.parameter + " : " +  this.value + al + "**";
   return str;
  }
}

function checkForNewAchivements(profile){
  let newAchivements = [];
  let achivements = DataToAchivement(DataLayer.getData("Achivements"));
  for(let i = 0; i < achivements.length; i++){
    if(!profile.hasAchivement(achivements[i].ID)){
      if(achivements[i].checkIfAchived(profile)){
        newAchivements.push(achivements[i]);
      }
    }
  }
  return newAchivements;

}

function DataToAchivement(data){
  if(Array.isArray(data)){
    let arr = [];
    for(let i = 0; i < data.length; i++){
      arr.push(singleDataToAchivement(data[i]));
    }
    return arr;
  }else{
    return singleDataToAchivement(data);
  }
}

function singleDataToAchivement(data){
  let achivement = new Achivement();
  for(let propt in data){
    if(achivement.hasOwnProperty(propt)){
      achivement[propt] = data[propt];
    }else{
      throw "Achivement doesn't have porprety " + propt + " you are trying to assign from JSON_Data";
    }
  }
  return achivement;
}


module.exports = {Achivement, DataToAchivement, checkForNewAchivements};
