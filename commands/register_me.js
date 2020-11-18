const upDir = __dirname.replace("commands","");
const profiles = require(upDir + "Profile.js");
module.exports = {
	name: 'register_me',
	description: 'Creates new profile in json with profiles, from discord profile data, if not there.',
	execute(message, args) {
		if(profiles.hasRegisteredProfile(message.member.id)){
      message.channel.send("Your profile is already created.");
    } else{
      let newProfile = new profiles.Profile(message.member.user.tag, message.member.id);
      profiles.addNewProfile(newProfile);
      message.channel.send("Your profile was created.");
    }
	},
};
