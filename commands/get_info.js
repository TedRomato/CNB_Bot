const upDir = __dirname.replace("commands","");
const Profiles = require(upDir + "Profile.js");
const DataLayer = require(upDir + "DataLayer.js");




module.exports = {
	name: 'get_info',
	description: '[Syntax: !get_info /*tagName*/] Displays general info of profile. When you enter no argument, it uses your takName as argument.',
	execute(message, args) {
		let data;
		if(!args.length){
			data = DataLayer.getDataPieceCondition("Profiles", { "ID":message.member.id });
    }else{
			data = DataLayer.getDataPieceCondition("Profiles", { "nameTag":args[0] });
    }
		console.log(Profiles.singleDataToProfile(data));
		if(data == null){
			message.channel.send("You have to register first.");
		}else{
			message.channel.send(Profiles.singleDataToProfile(data).getProfileInfo());
		}
	},
};
