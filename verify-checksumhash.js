//verifying checksumhash

/* import checksum generation utility */
var PaytmChecksum = require("./PaytmChecksum");

paytmChecksum = request.body.CHECKSUMHASH;
delete request.body.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(request.body, config.PAYTM_MERCHANT_KEY, paytmChecksum);
if (isVerifySignature) {
	console.log("Checksum Matched");
} else {
	console.log("Checksum Mismatched");
}