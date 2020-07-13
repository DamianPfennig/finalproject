var weather = require('weather-js');

var data;
module.exports.getWeather = async function (city) {
    await weather.find({ search: `${city}`, degreeType: 'C' }, function (err, result) {
        if (err) console.log(err);
        data = JSON.stringify(result, null, 2);
        // console.log(JSON.stringify(result, null, 2));

    })
    return data;
};