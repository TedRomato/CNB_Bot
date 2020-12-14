const upDir = __dirname.replace("commands","");
const Issues = require(upDir + "Issue.js");
const Profiles = require(upDir + "Profile.js");
const DataLayer = require(upDir + "DataLayer.js");

module.exports = {
	name: 'changed_name',
	description: '[Syntax: !changed_name] If you have changed your name. Type this command, so everything works as expected.',
	execute(message, args) {
    let profiles = DataLayer.getData('Profiles');
    for(let i = 0; i < profiles.length; i++){
      if(profiles[i].ID == message.member.id){
        if(profiles[i].nameTag == message.member.user.tag){
          message.channel.send("Your name is already set to: " + profiles[i].nameTag);
        }else{
          profiles[i].nameTag = message.member.user.tag;
          DataLayer.saveData('Profiles', profiles);
          message.channel.send("Your name is now set to: " + profiles[i].nameTag);
        }
      }
    }
  }
}
