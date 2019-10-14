let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();

exports.getGame = function (gameId) {
    return hltbService.detail(gameId);
};