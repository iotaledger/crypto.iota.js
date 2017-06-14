var chai = require('chai');
var assert = chai.assert;
var converter = require('../../src/converter/converter.js');

describe.only('Converter.fromValue', function () {

    var tests = [
        {
            number: 0,
            trits: [0]
        },
        {
            number: -0,
            trits: [0]
        },
        {
            number: 1,
            trits: [1]
        },
        {
            number: -1,
            trits: [-1]
        },
        {
            number: 2,
            trits: [-1, 1]
        },
        {
            number: -2,
            trits: [1, -1]
        },
        {
            number: 3,
            trits: [0, 1]
        },
        {
            number: 6,
            trits: [0, -1, 1]
        },
        {
            number: 7,
            trits: [1, -1, 1]
        },
        {
            number: 8,
            trits: [-1, 0, 1]
        },
        {
            number: 9,
            trits: [0, 0, 1]
        },
        {
            number: 10,
            trits: [1, 0, 1]
        },
        {
            number: 11,
            trits: [-1, 1, 1]
        },
        {
            number: 26,
            trits: [-1, 0, 0, 1]
        },
        {
            number: 27,
            trits: [0, 0, 0, 1]
        },
        {
            number: 28,
            trits: [1, 0, 0, 1]
        },
        {
            number: 1.1,
            trits: [1]
        }
    ]

    tests.forEach(function (test) {
        it('should return a valid trit array from a number: \'' + test.number + '\' with \'' + test.trits + '\'', function () {
            var result = converter.fromValue(test.number);
            assert.deepEqual(test.trits, result);
        });
    });
});
