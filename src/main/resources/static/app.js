var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#toggles").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/commands/blink', function (toggleMessage) {
            showLED(toggleMessage);
        });
        stompClient.subscribe('/commands/sample', function (toggleMessage) {
            showSampler(toggleMessage);
        });
        stompClient.subscribe('/readings/temperature', function (reading) {
            showTemp(reading);
        });
        stompClient.subscribe('/readings/humidity', function (reading) {
            showHumidity(reading);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendSample() {
    stompClient.send("/esp/buttons", {}, JSON.stringify({'button': 1 }));
}

function sendBlink() {
    stompClient.send("/esp/buttons", {}, JSON.stringify({'button': 0 }));
}

function showLED(toggleMessage) {
	
	device = JSON.parse(toggleMessage.body).device;
    $("#toggles").append("<tr><td>BLINK : " + device + "</td></tr>");
}
function showSampler(toggleMessage) {
	
	device = JSON.parse(toggleMessage.body).device;
    $("#toggles").append("<tr><td>SAMPLE : " + device + "</td></tr>");
}

function showTemp(reading) {
	
	value = JSON.parse(reading.body).value;
    $("#temperature").html("TEMP : " + value + " degC");
}

function showHumidity(reading) {
	
	value = JSON.parse(reading.body).value;
    $("#humidity").html("HUMIDITY : " + value + "%");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#sampleButton" ).click(function() { sendSample(); });
    $( "#blinkButton" ).click(function() { sendBlink(); });
});

