const upDir = __dirname.replace("commands","");
const Achivements = require(upDir + "Achivement.js");
const DataLayer = require(upDir + "DataLayer.js");




module.exports = {
	name: 'get_achivements',
	description: '[Syntax: !get_achivements /*condition*/ /*nameTag*/]] Returns full list of achivements under certain condition for a selected profile. If no second argument is enterd, your profiles nameTag will be used.',
	execute(message, args) {
    let condition = args[0];
    let achivements = Achivements.DataToAchivement(DataLayer.getData('Achivements'));
    let profile = DataLayer.getDataPieceCondition("Profiles",{ID:message.member.id});
    if(args[1] != null){
      profile = DataLayer.getDataPieceCondition("Profiles",{nameTag:args[1]});
      if(profile == null){
        message.channel.send(args[1] + " is not a valid user.");
      }
    }

    switch (condition) {
      case 'all':
        for(let i = 0; i < achivements.length; i++){
          message.channel.send(achivements[i].getInfo());
        }
        break;
      case 'unlocked':
        for(let i = 0; i < profile.achivements.length; i++){
          message.channel.send(Achivements.DataToAchivement(DataLayer.getDataPieceCondition("Achivements",{ID:profile.achivements[i]})).getInfo());
        }
        break;
      case 'missing':
        for(let i = 0; i < achivements.length; i++){
          let skip = false;
          for(let x = 0; x < profile.achivements.length;x++){
            if(achivements[i].ID == profile.achivements[x]){
              skip = true;
              break;
            }
          }
          if(!skip){
            message.channel.send(achivements[i].getInfo());
          }
        }
        break;
      default:
        message.channel.send("No condition argument.");
    }
	},
};
