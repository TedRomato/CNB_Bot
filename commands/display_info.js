const upDir = __dirname.replace("commands","");
const profiles = require(upDir + "Profile.js");

module.exports = {
	name: 'display_info',
	description: 'displays basic info of a profile',
	execute(message, args) {
		if(!args.length){
      message.channel.send(profiles.getProfileInfo(message.member.user.tag));
    }else{
      message.channel.send(profiles.getProfileInfo(args[0]));
    }
	},
};
