localStorage.clear();

$("#nextBtn").click(function () {
    var ethUSDval = $('#ethAmount').val();
    var ranking;

    if (ethUSDval >= 500 && ethUSDval <= 2499) {
        ranking = "Bronze";
    } 
    else if (ethUSDval >= 2500 && ethUSDval <= 9999) {
        ranking = "Silver";
    } 
    else if (ethUSDval >= 10000 && ethUSDval <= 24999) {
        ranking = "Gold";
    } 
    else if (ethUSDval >= 25000 && ethUSDval <= 50000) {
        ranking = "Platinum";
    }

    if (ranking != undefined || ranking != null) {
        document.getElementById("rank").innerHTML = 'Your rank is ' + ranking + " based on the bonus structure";
        localStorage.setItem("ranking", ranking);
    }

})

$("#depositBtn").click(function () {

    var body = {
        crx: localStorage.getItem("crx"),
        usd: localStorage.getItem("usd"),
        ethAddress: localStorage.getItem("eth_address"),
        ranking: localStorage.getItem("ranking"),
        
    }

    console.log(body);
})

/** @Description ETH to CFX Conversion rate display*/
var ethAddressVal = document.getElementById("ethAddress");

$("#ethAmount").keyup(function () {
    var ethVal = this.value;
    var cfxRate = 0.03;
    var convertedAmt = ethVal / cfxRate;
    var ethAddress = document.getElementById("ethAddress");

    localStorage.setItem("crx", convertedAmt);
    localStorage.setItem("usd", ethVal);
    localStorage.setItem("eth_address", ethAddress);

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