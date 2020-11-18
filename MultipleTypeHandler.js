const issues = require(__dirname + "/Issue.js");
const profiles = require(__dirname + "/Profile.js");


function assignIssueToProfile(issueID, profileID){
  let profile = profiles.getProfileFromID(profileID);
  let issue = issues.getIssueFromID(issueID);
  if(profile == null){
    return "Profile is not registered"
  }
  if(profile.currentIssue != undefined){
    return "You have unfinished issue, finish it first."
  }
  if(issue == null){
    return "Incorrect issue ID"
  }
  if(issue.solver != undefined){
    return "This issue is being solved by: " + issue.solver;
  }

  issue.solver = profileID;
  profile.currentIssue = issueID;
  profiles.changeProfile(profile);
  issues.changeIssue(issue);
  return true;
}


module.exports = {assignIssueToProfile}
