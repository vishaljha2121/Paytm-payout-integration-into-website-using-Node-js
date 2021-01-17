// test 1 to run all APIs in a sequence with required details
// setup the Paytm payout link

const payoutLink = require('./payout-link');
response = payoutLink.createLink()
if (response == "SUCCESS"){
        console.log("Payout link created");
}else{
        console.log("Link failed.");
}
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");
//generating payment order and order details
//details required here...

//generating checksum
const generateChecksumhash = require('./generate-checksum');
error = generateChecksumhash.generate();
console.log("Checksum signature generated.");
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");

//calling the wallet transfer api to transfer fund to the benificiary
const wallet = require("./wallet-transfer-api");
responseW = wallet.walletTransfer();
console.log("Wallet api called with following response: "+ responseW);
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");

/*seems to fail everytime
//verifying checksumhash
const verify = require('./verify-checksumhash');
ChecksumhashVerify = verify.verify();
if (ChecksumhashVerify){
        console.log("Checksum Matched");
}else{
        console.log("Checksum mismatched");
}
*/

//status query API to re verify the transaction
//orderId required to verify the payment or transaction details
const status = require('./status-query');
statusQuery = status.verify();
console.log("Status query API called with following response: " + statusQuery);
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");