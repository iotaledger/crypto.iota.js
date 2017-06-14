var chai = require('chai');
var assert = chai.assert;
var converter = require('../../src/converter/converter.js');

describe.only('Converter.trytes', function () {

    var tests = [
        {
            trits: [0],
            trytes: '9'
        },
        {
            trits: [1],
            trytes: 'A'
        },
        {
            trits: [-1],
            trytes: 'Z'
        },
        {
            trits: [1, -1],
            trytes: 'Y'
        },
        {
            trits: [-1, 1, 1],
            trytes: 'K'
        },
        {
            trits: [-1, 0, 0, 1],
            trytes: 'ZA'
        },
        {
            trits: [1, -1, 0, 0, 1],
            trytes: 'YC'
        },
        {
            trits: [1, 1, 1, 1, 1, 1, 1],
            trytes: 'MMA'
        },
        {
            trits: [1, 1, 1, 1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 1, 1, 0, -1, 0, 1, 0, 0, -1, -1, 0, -1, -1, 0, 1, 1],
            trytes: 'MARKISCOOL'
        }
    ]

    tests.forEach(function (test) {
        it('should return a tryte from a trit array: \'' + test.trits + '\' with \'' + test.trytes + '\'', function () {
            var originalTrits = test.trits.slice();
            var result = converter.trytes(test.trits);
            assert.deepEqual(test.trits, originalTrits);
            assert.deepEqual(test.trytes, result);
        });
    });
});
