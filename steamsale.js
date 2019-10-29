var steamsale = new Date('2019-11-26');

exports.getSteamSale = function () {
    return steamsale.toDateString();
};

exports.getTimeUntilSteamSale = function () {
    return steamsale - Date.now();
};
