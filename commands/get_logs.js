const upDir = __dirname.replace("commands","");
const Logs = require(upDir + "Log.js");
const DataLayer = require(upDir + "DataLayer.js");

module.exports = {
	name: 'get_logs',
	description: '/*UNFINISHED*/',
	execute(message, args) {
    console.log(args[0][0] + " " + args[0][1]);
    let logs = DataLayer.getData('Logs');
    let id = message.member.id;
    if(args[1]){
      id = DataLayer.getDataPieceCondition('Profiles', {"nameTag" : args[1]}).ID;
      if(id == null){
        message.channel.send("Profile " + args[1] + " doesn't exist");
        return;
      }
    }
    console.log("len : " + logs.length);
    if(args[0][0] == '-'){
      if(args[0][1] == 'l'){
        if(args[0].length == 2){
          console.log(logs.length);
          for(let i = logs.length - 1; i >= 0; i--){
            if(logs[i].profile == id){
              message.channel.send(Logs.dataToLog(logs[i]).getLogInfo());
							message.channel.send('---------------------------------\n');
              return;
            }
          }
        }else{
          let counter = 0;
          let amount = parseInt(args[0].slice(2));
          for(let i = logs.length - 1; i >= 0; i--){
            if(logs[i].profile == id){
              message.channel.send(Logs.dataToLog(logs[i]).getLogInfo());
							message.channel.send('---------------------------------\n');
              counter ++;
              if(counter == amount){
                return;
              }
            }
          }
        }
      }
    }
  }
}
