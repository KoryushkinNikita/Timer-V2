const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
let intervalID, isActive = false, isStoped = false, isBeggining = true;

function timerStopped(){
    document.getElementById('endingText').hidden = false;
    clearInterval(intervalID);
    isActive = false;
    isBeggining = true;
    isStoped = true;
}

function startTimer(){
    document.getElementById('endingText').hidden = true;
    isActive = true;
    isStoped = false;
    intervalID = setInterval(timeLeft, 1000);
}

function timeLeft(){
    seconds.innerText = parseInt(seconds.innerText) - 1;
    if (seconds.innerText == 0 && minutes.innerText == 0 && hours.innerText == 0) {timerStopped(); return;}
    if (seconds.innerText == -1){
        minutes.innerText = parseInt(minutes.innerText) - 1
        if (minutes.innerText == -1){
            if (hours.innerText == 0) {timerStopped(); return;}
            else hours.innerText = parseInt(hours.innerText) - 1;
            minutes.innerText = 59;
        }
        seconds.innerText = 59;
    }
}

const checkDec = (time) => parseInt(time) > 0 ? true : false;

document.getElementById('hoursUp').addEventListener('click', function(){
    if (!isActive) hours.innerText = parseInt(hours.innerText) + 1;
})

document.getElementById('minutesUp').addEventListener('click', function(){
    if (!isActive) minutes.innerText = parseInt(minutes.innerText) + 1;
})
document.getElementById('secondsUp').addEventListener('click', function(){
    if (!isActive) seconds.innerText = parseInt(seconds.innerText) + 1;
})
document.getElementById('hoursDown').addEventListener('click', function() {
    if (checkDec(hours.innerText) && !isActive) hours.innerText = parseInt(hours.innerText) - 1;
})
document.getElementById('minutesDown').addEventListener('click', function() {
    if (checkDec(minutes.innerText) && !isActive) minutes.innerText = parseInt(minutes.innerText) - 1;
})
document.getElementById('secondsDown').addEventListener('click', function() {
    if (checkDec(seconds.innerText) && !isActive) seconds.innerText = parseInt(seconds.innerText) - 1;
})

document.getElementById('stopButton').addEventListener('click', function(){
    if ((hours.innerText != 0 || minutes.innerText != 0 || seconds.innerText != 0) && isActive){
        if (intervalID) clearInterval(intervalID);
        isActive = false;
        isStoped = true;
        document.getElementById('submitButton').innerText = 'continue'
    }
})

document.getElementById('submitButton').addEventListener('click', function(){
    this.style.backgroundColor = 'white';
    setTimeout(() => this.style.backgroundColor = 'inherit', 100);
    if (seconds.innerText == 0 && minutes.innerText == 0 && hours.innerText == 0) {timerStopped();return;}
    if (isBeggining) {startTimer(); isBeggining = false;}
    else if (isStoped) {
        this.innerText = 'start';
        intervalID = setInterval(timeLeft, 1000);
        isActive = true;
        isStoped = false;
    }
    
})

