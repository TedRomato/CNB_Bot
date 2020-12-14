const upDir = __dirname.replace("commands","");
const Profiles = require(upDir + "Profile.js");
const DataLayer = require(upDir + "DataLayer.js");
const RoleHandler = require(upDir + "RoleHandler.js");

module.exports = {
	name: 'register_me',
	description: 'Creates new profile in json with profiles, from discord profile data, if not there.',
	execute(message, args) {

		if(DataLayer.getDataPieceCondition("Profiles", {"ID":message.member.id }) != null){
      message.channel.send("Your profile is already created.");
    }	else{
			let profiles = DataLayer.getData('Profiles');
      let newProfile = new Profiles.Profile(message.member.user.tag, message.member.id);
			//add role  id'
			newProfile.roles = newProfile.assignNewRoles(message).then(() => {
				profiles.push(newProfile);
				console.log('saving');
				DataLayer.saveData("Profiles",profiles);
	      message.channel.send("Your profile was created.")
			});

    }
	},
};
