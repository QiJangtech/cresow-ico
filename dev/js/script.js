localStorage.clear();

$("#nextBtn").click(function () {
    var ethUSDval = $('#ethAmount').val();
    var ranking;

    if (ethUSDval >= 500 && ethUSDval <= 2499) {
        ranking = "Bronze";
    } else if (ethUSDval >= 2500 && ethUSDval <= 9999) {
        ranking = "Silver";
    } else if (ethUSDval >= 10000 && ethUSDval <= 24999) {
        ranking = "Gold";
    } else if (ethUSDval >= 25000 && ethUSDval <= 50000) {
        ranking = "Platinum";
    }

    // var ethValue = ethUSDval * 

    if (ranking != undefined || ranking != null) {
        document.getElementById("rank").innerHTML = 'Your rank is ' + ranking + " based on the bonus structure";
        localStorage.setItem("ranking", ranking);
    }

})

var getUrlParam = function getUrlParameter(sParam) {

    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


$.ajax({
    type: 'GET',
    url: "http://18.136.101.29/api/profile/users",
    headers: {
        "Authorization": 'Bearer ' + getUrlParam('token')
    },
    success: function (res) {
        console.log(res);
        localStorage.setItem("user_id", res.result.id);
        header_user(res);
        detailReferralByID(res.result.id);
    },
    error: function (res) {
        console.log(res);
    }
})


$.ajax({
    type: 'GET',
    url: 'http://18.136.101.29/api/registered_users',
    success: function (res) {
        console.log(res);
        totalUsers(res);
    },
    error: function (res) {
        console.log(res);
    }
})

function detailReferralByID(data_id) {


    $.ajax({
        type: 'GET',
        url: 'http://18.136.101.29/api/referral_records?user_id=' + data_id,
        headers: {
            "Authorization": 'Bearer ' + getUrlParam('token')
        },
        success: function (res) {
            console.log(res);
            if(res.result.bonus != undefined){
                document.getElementById("referral_bonus").innerHTML = res.result.bonus;
            }
            else{
                document.getElementById("referral_bonus").innerHTML = "0";
            }

            if(res.result.amount_usd != undefined){
                document.getElementById("user_crx").innerHTML = res.result.amount_usd / 0.03;
            }
            else{
                document.getElementById("user_crx").innerHTML = "0";
            }

            if(res.result.amount_eth != undefined){
                document.getElementById("eth_value").innerHTML = res.result.amount_eth;
            }
            else{
                document.getElementById("eth_value").innerHTML = "0";
            }
        },
        error: function (res) {
            console.log(res);
        }
    })
}

$("#depositBtn").click(function () {

    var eth_val;
    var body;

    $.ajax({
        type: 'GET',
        url: "https://u03g7xi1gh.execute-api.us-east-1.amazonaws.com/dev/crypto/ETH",
        success: function (res) {
            var usdVal = localStorage.getItem("usd");
            var convertedETH = usdVal / res.message;
            eth_val = convertedETH;
            set_body();
        },
        error: function (res) {
            console.log(res);
        }
    })

    function set_body() {
        body = {
            crx_token: localStorage.getItem("crx"),
            usd_amount: localStorage.getItem("usd"),
            from_address: localStorage.getItem("eth_address"),
            package: localStorage.getItem("ranking"),
            userId: localStorage.getItem("user_id"),
            eth_amount: eth_val
        }

        $.ajax({
            type: 'POST',
            url: "https://u03g7xi1gh.execute-api.us-east-1.amazonaws.com/dev/wallet/deposit",
            contentType: 'application/json',
            data: JSON.stringify(body),
            dataType: 'json',
            success: function (res) {
                console.log("success", res)
            },
            error: function (res) {
                console.log("error", res);
            }
        })

        console.log(body);
    }

})

/** @Description ETH to CFX Conversion rate display*/
var ethAddressVal = document.getElementById("ethAddress");

$("#ethAmount").keyup(function () {
    var ethVal = this.value;
    var cfxRate = 0.03;
    var convertedAmt = ethVal / cfxRate;
    var ethAddress = document.getElementById("ethAddress").value;

    localStorage.setItem("crx", convertedAmt);
    localStorage.setItem("usd", ethVal);
    localStorage.setItem("eth_address", ethAddress);

    $.ajax({
        type: 'GET',
        url: "https://u03g7xi1gh.execute-api.us-east-1.amazonaws.com/dev/crypto/ETH",
        success: function (res) {
            var convertedETH = ethVal / res.message;
            document.getElementById("eth_pay_amount").innerHTML = 'Pay exact amount of : ' + convertedETH + ' to this Public Key';
        },
        error: function (res) {
            console.log(res);
        }
    })

    $("#ethAmountHelp").html(ethVal + ' USD = ' + convertedAmt + ' CRX');
});

/** @Description ETH Address manual validation*/

$("#ethAddress").keyup(function () {
    if (ethAddressVal.checkValidity()) {
        $(".result").html("Valid Address");
        $(".result").addClass("green");
        $(".result").removeClass("red");
    } else {
        $(".result").html("Invalid Address");
        $(".result").removeClass("green");
        $(".result").addClass("red");
    }

    if (ethAddressVal.value == '') {
        $(".result").html("");
    }
});

function copyTextKey() {
    document.getElementById("pubKey").select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
    $("#copied").html("Copied").setTimeout(100);
}



// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

}, 1000);

function header_user(data){
    document.getElementById("referral_id_user").innerHTML = '(' + 'Ref_ID : ' + data.result.referral_id + ')';
    document.getElementById("dashboard_username").innerHTML = data.result.first_name + ' ' + data.result.last_name;
    // document.getElementById("referral_bonus").innerHTML = "BONUSGG";
    // document.getElementById("user_crx").innerHTML = "CRXGG";
}

function totalUsers(data){
    document.getElementById("total_users").innerHTML = data.result + ' ' + "users";
}
