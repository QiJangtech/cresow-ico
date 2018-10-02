
/** @Description ETH to CFX Conversion rate display*/

// $("#ethAmount").keyup(function () {
//     var ethVal = this.value;
//     var cfxRate = 1000;
//     var convertedAmt = cfxRate * ethVal;
//     $("#ethAmountHelp").html(ethVal + ' ETH = ' + convertedAmt + ' CRX');
// });

/** @Description ETH Address manual validation*/

var ethAddressVal = document.getElementById("ethAddress");
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
var x = setInterval(function() {

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