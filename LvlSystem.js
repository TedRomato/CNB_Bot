
/// REFACTOR ///

function getLvl(xp) {
  let pastlvl = 0;
  let min;
  for(let lvl = 0; lvl <= 50; lvl++){
    min = Math.round(pastlvl + lvl * 4 + Math.pow(lvl, 1.4)+50);
    pastlvl = min;
    if(xp < min){
      return lvl + 1;
    }
  }
}

////// vraci blbe ///////
function getMinXP(lvlMin){
  let pastlvl = 0;
  let min = 0;
  for(let lvl = 0; lvl < lvlMin - 1; lvl++){
    min = Math.round(pastlvl + lvl * 4 + Math.pow(lvl, 1.4)+50);
    pastlvl = min;
  }
  return min;
}


module.exports = {getLvl,getMinXP};
