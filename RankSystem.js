const rankSystem = [{"RankName":"POTATO", "Color":"#c6c491"},
                 {"RankName":"Bronze", "Color":"#b98e21"},
                 {"RankName":"Silver", "Color":" #c3bdae"},
                 {"RankName":"Gold", "Color":"#debb0b"},
                 {"RankName":"Platinum", "Color":"#0efda4"},
                 {"RankName":"Diamond", "Color":"#00e3fb"},
                 {"RankName":"M4ST3R_0F_COD3", "Color":"#ea0404"}];


function getRankName(rankPoints){
  let rankName = rankSystem[0]["RankName"];
  for(let i = 0; i < rankSystem.length; i++){
    if(rankPoints > i*75*Math.pow(2, i)){
      rankName = rankSystem[i]["RankName"];
    }
  }
  return rankName;
}

module.exports = {getRankName, rankSystem};
