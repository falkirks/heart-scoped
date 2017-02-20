var socket = io('//localhost:3000');
var path = window.location.pathname.slice(1).split("/").join(".");
var heartsToRun = 0;
var running = false;

socket.on('welcome', function (data) {
    path = data.path;
});
socket.on('error', function (data) {
    console.log(data);
    alert("An unexpected error occurred.");
});

socket.on('heart', function (data) {
    animateHeart();
});

var sendHeart = function () {
    socket.emit('heart', {path: path})
};
var animateHeart = function () {
    heartsToRun++;
    if(!running) {
        running = true;
        $('#heart').addClass('heart-pulsing');
        window.setTimeout(endAnimate, 1000 * heartsToRun);
        heartsToRun = 0;
    }
};

var endAnimate = function () {
    if(heartsToRun > 0){
        window.setTimeout(endAnimate, 1000*heartsToRun);
        heartsToRun = 0;
    }
    else{
        $('#heart').removeClass('heart-pulsing');
        running = false;
    }
};

socket.emit('hello', {
    path: path,
    fresh: true
});

$('#heart').click(function(){
    sendHeart();
    animateHeart();
});