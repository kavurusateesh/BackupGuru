const moment = require('moment');

var slotTimings = function (startTime, endTime, duration) {

    const resultSlots = [];
    const times = 24 * 4;
    const toPrint = [];
    // let beginningTime = moment(startTime, 'hh:mm A').format('HH:mm:ss');
    // let beginEndTime = moment(endTime, 'hh:mm A').format('HH:mm:ss');
    // console.log(beginningTime + " beginningTime " + " beginEndTime " + beginEndTime);
    for (let i = 0; i < times; i++) {
        const beginningTime = moment(startTime, 'hh:mm A').format('HH:mm:ss');
        const beginEndTime = moment(endTime, 'hh:mm A').format('HH:mm:ss');
        const toPrint = moment(startTime, 'HH:mm:ss').add(duration * i, 'minutes').format('hh:mm A');
        if (moment(toPrint, 'hh:mm A').format('HH:mm:ss').valueOf() >= moment(startTime, 'hh:mm A').format('HH:mm:ss').valueOf() && moment(toPrint, 'hh:mm A').format('HH:mm:ss').valueOf() <= moment(endTime, 'hh:mm A').format('HH:mm:ss').valueOf()) {
            if (moment(toPrint, 'hh:mm A').format('HH:mm:ss') === "00:00:00") {
                break;
            } else {
                if (moment(toPrint, 'hh:mm A').format('HH:mm:ss').valueOf() < moment(endTime, 'hh:mm A').format('HH:mm:ss').valueOf()) {
                    resultSlots.push({ startTime: toPrint });
                }
            }
        }
    }
    filtered = resultSlots.filter(function (a) {
        if (!this[a.startTime]) {
            this[a.startTime] = true;
            return true;
        }
    }, Object.create(null));
    return filtered;
}

// 
var slotType = function (startTime) {

    const hour = moment(startTime, 'hh:mm A').hours();
    var type = "";
    if (hour >= 1 && hour < 12) {
        type = "Morning";
    }
    else if (hour >= 12 && hour < 16) {
        type = "Afternoon";
    }
    else if (hour >= 16 && hour < 20) {
        type = "Evening";
    }
    else if (hour >= 20 && hour <= 24) {
        type = "Night";
    }
    return type;
}


var generateDaysBetweenDates = function (startDate, endDate) {
    let date = []
    while (moment(startDate) <= moment(endDate)) {
        date.push({ startDate: startDate });
        startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
    }
    return date;
}


var convert12To24Hours = function (givenTime) {
    let converted24Format = moment(givenTime, 'hh:mm A').format('HH:mm:ss');
    return converted24Format;
}

var convert24To12Hours = function (givenTime) {
    let converted12Format = moment(givenTime, 'HH:mm A').format('hh:mm A');
    return converted12Format;
}


module.exports.slotTimings = slotTimings;
module.exports.slotType = slotType;
module.exports.generateDaysBetweenDates = generateDaysBetweenDates;
module.exports.convert12To24Hours = convert12To24Hours;
module.exports.convert24To12Hours = convert24To12Hours;