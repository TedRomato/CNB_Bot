const upDir = __dirname.replace("commands","");
const Profiles = require(upDir + "Profile.js");
const DataLayer = require(upDir + "DataLayer.js");




module.exports = {
	name: 'display_info',
	description: 'displays basic info of a profile',
	execute(message, args) {
		let data;
		if(!args.length){
			data = DataLayer.getDataPieceCondition("Profiles", '{ "ID":"' + message.member.id + '" }');
    }else{
			data = DataLayer.getDataPieceCondition("Profiles", '{ "nameTag":"' + args[0] + '" }');
    }
		if(data == null){
			message.channel.send("You have to register first.");
		}else{
			message.channel.send(Profiles.singleDataToProfile(data).getProfileInfo());
		}
	},
};
