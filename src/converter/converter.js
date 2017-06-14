/**
*
*   Conversion functions
*
**/

var RADIX = 3;
var MAX_TRIT_VALUE = 1;
var MIN_TRIT_VALUE = -1;

// All possible tryte values
var trytesAlphabet = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// map of all trits representations
var trytesTrits = [
    [ 0,  0,  0],
    [ 1,  0,  0],
    [-1,  1,  0],
    [ 0,  1,  0],
    [ 1,  1,  0],
    [-1, -1,  1],
    [ 0, -1,  1],
    [ 1, -1,  1],
    [-1,  0,  1],
    [ 0,  0,  1],
    [ 1,  0,  1],
    [-1,  1,  1],
    [ 0,  1,  1],
    [ 1,  1,  1],
    [-1, -1, -1],
    [ 0, -1, -1],
    [ 1, -1, -1],
    [-1,  0, -1],
    [ 0,  0, -1],
    [ 1,  0, -1],
    [-1,  1, -1],
    [ 0,  1, -1],
    [ 1,  1, -1],
    [-1, -1,  0],
    [ 0, -1,  0],
    [ 1, -1,  0],
    [-1,  0,  0]
];

/**
*   Converts trytes into trits
*
*   @method trits
*   @param {String|Int} input Tryte value to be converted. Can either be string or int
*   @param {Array} state (optional) state to be modified
*   @returns {Array} trits
**/
var trits = function(input, state) {
    var trits = state || [];

    if (Number.isInteger(input)) {

        var absoluteValue = input < 0 ? -input : input;

        while (absoluteValue > 0) {
            var remainder = absoluteValue % 3;
            absoluteValue = Math.floor(absoluteValue / 3);

            if (remainder > 1) {
                remainder = -1;
                absoluteValue++;
            }

            trits[trits.length] = remainder;
        }

        if (input < 0) {
            for (var i = 0; i < trits.length; i++) {
                trits[i] = -trits[i];
            }
        }
    } else {

        for (var i = 0; i < input.length; i++) {

            var index = trytesAlphabet.indexOf(input.charAt(i));
            trits[i * 3] = trytesTrits[index][0];
            trits[i * 3 + 1] = trytesTrits[index][1];
            trits[i * 3 + 2] = trytesTrits[index][2];
        }
    }

    // Remove trailing zero trits
    while (trits.length > 1 && trits.slice(-1)[0] === 0) {
        trits.pop();
    }

    return trits;
}

/**
*   Converts trits into trytes
*
*   @method trytes
*   @param {Array} trits
*   @returns {String} trytes
**/
var trytes = function(trits) {
    var trytes = "";

    for (var i = 0; i < trits.length; i += 3) {
        var subTrits = trits.slice(i, i+3);
        while (subTrits.length < 3) {
            subTrits.push(0);
        }

        // Iterate over all possible tryte values to find correct trit representation
        for (var j = 0; j < trytesAlphabet.length; j++) {
            if (
                trytesTrits[j][0] == subTrits[0] &&
                trytesTrits[j][1] == subTrits[1] &&
                trytesTrits[j][2] == subTrits[2]
            ) {
                trytes += trytesAlphabet.charAt(j);
                break;
            }
        }
    }

    return trytes;
}

/**
*   Converts trits into an integer value
*
*   @method value
*   @param {Array} trits
*   @returns {String} trytes
**/
var value = function(trits) {

    var value = 0;

    for (var i = trits.length; i-- > 0; ) {

        value = value * 3 + trits[i];
    }

    return value;
}


/**
*   Converts  an integer value into trits
*
*   @method fromValue
*   @param {Number} value
*   @returns {Array} trits
**/
var fromValue = function(value) {
    value = Math.floor(value);
    if (value === 0) {
        return [0];
    }

    var destination = [];
    var absoluteValue = Math.abs(value);
    var i = 0;
    while (absoluteValue > 0) {
        var remainder = (absoluteValue % RADIX);
        absoluteValue = Math.floor(absoluteValue / RADIX);
        if (remainder > MAX_TRIT_VALUE) {

            remainder = MIN_TRIT_VALUE;
            absoluteValue++;
        }
        destination[i] = remainder;
        i++;
    }
    if (value < 0) {
        for (var i = 0; i < destination.length; i++) {
            destination[i] = destination[i] == 0? 0: -destination[i];
        }
    }

    return destination;
}

module.exports = {
    trits       : trits,
    trytes      : trytes,
    value       : value,
    fromValue   : fromValue,
};
