//Generating checksum
const Paytm = require('paytmchecksum');
const PaytmChecksum = require('./PaytmChecksum');
const { config } = require('process');


class GenerateChecksumhash {

        static generate() {
                var paytmParams = {};
                /* initialize an array */
                paytmParams["MID"] = "sHPNew31688279570816";
                paytmParams["ORDERID"] = "YOUR_ORDER_ID_HERE";

                var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, "bb%5vshmF&NPpi#0");
                paytmChecksum.then((result) => {
                        console.log("genreateSignature Returns: " + result);
                }).catch((error) =>{
                        console.log(error);
                });
                
                return result,error;
        }

}
module.exports = GenerateChecksumhash;