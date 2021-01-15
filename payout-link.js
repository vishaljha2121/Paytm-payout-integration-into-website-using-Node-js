//creating payout link for merchant side
const https = require('https');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const PaytmChecksum = require('./PaytmChecksum');

class PayoutLink {

    static createLink(){
        var paytmParams = {};

        paytmParams["subwalletGuid"]      = "28054249-XXXX-XXXX-af8f-fa163e429e83";
        paytmParams["orderId"]            = "ORDERID_98765";
        paytmParams["amount"]             = "1.00";
        paytmParams["beneficiaryPhoneNo"] = "7777777777";
        paytmParams["beneficiaryEmail"]   = "test@example.com";
        paytmParams["notifyMode"]         = ["SMS","EMAIL"];
        paytmParams["comments"]           = "Your Comment Here";

        var post_data = JSON.stringify(paytmParams);

        /**
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        PaytmChecksum.generateSignature(post_data, "bb%5vshmF&NPpi#0").then(function(checksum){

            var x_mid      = "sHPNew31688279570816";
            var x_checksum = checksum;

            var options = {

                /* for Staging */
                hostname: 'staging-dashboard.paytm.com',

                /* for Production */
                // hostname: 'dashboard.paytm.com',

                path   : '/bpay/api/v1/payout-link/create',
                port   : 443,
                method : 'POST',
                headers: {
                    'Content-Type'  : 'application/json',
                    'x-mid'         : x_mid,
                    'x-checksum'    : x_checksum,
                    'Content-Length': post_data.length
                }
            };

            var response = "";
            var post_req = https.request(options, function(post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });

                post_res.on('end', function(){
                    console.log('Response: ', response);
                });
            });

            post_req.write(post_data);
            post_req.end();

            return response[0];
        });
    }
}

module.exports = PayoutLink;
