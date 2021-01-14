const { error } = require('console');
const { request } = require('http');
const https = require('https');





//Step 0: To create payout link for the merchant
const PaytmChecksum = require('./PaytmChecksum');
var paytmParams = {};

paytmParams["subwalletGuid"]      = "28054249-XXXX-XXXX-af8f-fa163e429e83";
paytmParams["orderId"]            = "ORDERID_98765";
paytmParams["amount"]             = "1.00";
paytmParams["beneficiaryPhoneNo"] = "7777777777";
paytmParams["beneficiaryEmail"]   = "test@example.com";
paytmParams["notifyMode"]         = ["SMS","EMAIL"];
paytmParams["comments"]           = "Your Comment Here";

var post_data = JSON.stringify(paytmParams);


PaytmChecksum.generateSignature(post_data, "YOUR_MERCHANT_KEY").then(function(checksum){

    var x_mid      = "YOUR_MID_HERE";
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
});
   








//Step 1: Create a payment order in system
//TBD



//Step 2: Generate checksum
const Paytm = require('paytmchecksum');
const { config } = require('process');

var paytmParams = {};
/* initialize an array */
paytmParams["MID"] = "YOUR_MID_HERE";
paytmParams["ORDERID"] = "YOUR_ORDER_ID_HERE";

var PaytmChecksum = PaytmChecksum.generateSignature(paytmParams, "YOUR_MERCHANT_KEY");
PaytmChecksum.then((result) => {
        console.log("genreateSignature Returns: " + result);
}).catch((error) =>{
        console.log(error);
});




//Step 3: Calling Wallet transfer API
var paytmParamsW = {};

paytmParamsW["subwalletGuid"]      = "28054249-XXXX-XXXX-af8f-fa163e429e83";
paytmParamsW["orderId"]            = "ORDERID_98765";
paytmParamsW["beneficiaryPhoneNo"] = "5555566666";
paytmParamsW["amount"]             = "1.00";

var post_data = JSON.stringify(paytmParamsW);
PaytmChecksum.generateSignature(post_data, "YOUR_MERCHANT_KEY").then(function(checksum){

        var x_mid      = "YOUR_MID_HERE";
        var x_checksum = checksum;
    
        var options = {
    
            /* for Staging */
            hostname: 'staging-dashboard.paytm.com',
    
            /* for Production */
            // hostname: 'dashboard.paytm.com',
    
            path: '/bpay/api/v1/disburse/order/wallet/{solution}',
            port: 443,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-mid': x_mid,
                'x-checksum': x_checksum,
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
    });






//Paytm backend does debt disbursal accounut balance and transfer the amount to benificiary. Then is communicates the transfer status on
//merchant's callback URL







//Step 4: Verify checksumhash recieved in request
//import checksum generation utility => already imported
//string we need to verify against checksum, from post request: because used for validation of checksum in callback response of transaction
var PaytmChecksum = require('./PaytmChecksum');

paytmChecksmu = request.body.CHECKSUMHASH;
delete request.body.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(request.body, config.PAYTM_MERCHANT_KEY, paytmChecksum);
if (isVerifySignature) {
        console.log("Checksum Matched");
} else {
        console.log("Checksum Mismatched");
}









//Step 5: Call status query API to re-verify the payment status
const PaytmChecksum = require('./PaytmChecksum');
var paytmParams = {};
paytmParams["orderId"] = "ORDERID_98765";
var post_data = JSON.stringify(paytmParams);

/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(post_data, "YOUR_MERCHANT_KEY").then(function(checksum){

    var x_mid      = "YOUR_MID_HERE";
    var x_checksum = checksum;

    var options = {

        /* for Staging */
        hostname: 'staging-dashboard.paytm.com',

        /* for Production */
        // hostname: 'dashboard.paytm.com',

        path: '/bpay/api/v1/disburse/order/query',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-mid': x_mid,
            'x-checksum': x_checksum,
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
});


//Paytm backend provides the payment status.



//Step 6: Verify the amount and payment status.
