var today = Date.now();
var steamsale = new Date('2019-10-29');
var timeUntil = steamsale - today;

exports.getSteamSale = function () {
    return steamsale.toDateString();
};

exports.getTimeUntilSteamSale = function () {
    return timeUntil;
};
