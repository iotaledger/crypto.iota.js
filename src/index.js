var Curl = require('./curl/curl');
var Converter = require('./converter/converter');

// binary  input, trytes output
//var getHash = function(trits or bytes) { }


//newAddress

//getChecksum

module.exports = {
    curl: Curl,
    converter: Converter,
    bundle: require('./bundle/bundle'),
    signing: require('./signing/signing')
}
