"use strict";
require("SparkHelper")
require("Model")



var playerID = getPlayerID();
var playerData = getPlayerData(playerID);
var event = getEvent();
var win = event.win;
if (playerData == null) {
    throw "playerData == null";
}
if (playerData.startedMatch == null) {
    throw "playerData.startedMatch == null";
}
var startedMatch = playerData.startedMatch;
var blue = startedMatch.teamBlue.playerID == playerID;
if (win == 1) {
    startedMatch.state = blue ? StartedMatchState.WinBlue : StartedMatchState.WinRed;
}
else {
    startedMatch.state = blue ? StartedMatchState.WinRed : StartedMatchState.WinBlue;
}
//startedMatch.changeWinnerRes1 = 10;
//startedMatch.changeWinnerRes2 = 10;
//startedMatch.changeWinnerHonor = 10;
//startedMatch.changeLoserRes1 = -10;
//startedMatch.changeLoserRes2 = -10;
//startedMatch.changeLoserHonor = -10;
save(playerData);
