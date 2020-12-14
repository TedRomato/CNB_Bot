const editJsonFile = require('edit-json-file');
const profilesPath =  __dirname + "/Profiles.json";
const issuesesPath =  __dirname + "/Issues.json";
const logsPath =  __dirname + "/Logs.json";
const achivementsPath =  __dirname + "/Achivements.json";

function determinePath(dataType){
  let filePath;
  switch (dataType) {
    case 'Issues':
      return issuesesPath;
    case 'Profiles':
      return profilesPath;
    case 'Logs':
      return logsPath;
    case 'Achivements':
      return achivementsPath;
    default:
      throw dataType + ' is unknown dataType';
  }
}

function indexOfFirst(dataType, dataConditions){
  let arr = [];
  let single = null;
  let allData = getData(dataType);
  let conditions = dataConditions;
  for(let propt in conditions){
    if(allData[0] != null && !allData[0].hasOwnProperty(propt)){
      throw "DataType: " + dataType + " doesn't have property: " + propt;
    }
    for(let i = 0; i < allData.length; i++){
        if(allData[i][propt] == conditions[propt]){
          return i;
      }
    }
  }
  return null;
}

function getData(dataType){
  let filePath = determinePath(dataType);
  let file = editJsonFile(filePath);
  let data = JSON.parse(file.get("data"));
  return data;
}

//condition format = { "name":"John" }
//returns all objects (0 returns null, 1 returns object, 2 and more returns array) that satisfy one or more condtitions
//when entering more condtitions - returns the first object that satisfies at least one

function getDataPieceCondition(dataType, dataConditions){
  let arr = [];
  let single = null;
  let allData = getData(dataType);
  let conditions = dataConditions;
  for(let propt in conditions){
    if(allData[0] != null && !allData[0].hasOwnProperty(propt)){
      throw "DataType: " + dataType + " doesn't have property: " + propt;
    }
    for(let i = 0; i < allData.length; i++){
        if(allData[i][propt] == conditions[propt]){
          if(single == null){
            single = allData[i];
          }else{
            if(arr.length == 0){
              arr.push(single);
            }
            arr.push(allData[i]);
          }
      }
    }
  }
  if(arr.length != 0){
    return arr;
  }else{
    return single;
  }

}

function saveData(dataType, newData){
  let filePath = determinePath(dataType);
  let file = editJsonFile(filePath);
  file.set("data", JSON.stringify(newData));
  file.save();
}



module.exports = {getData, getDataPieceCondition, saveData, indexOfFirst}
