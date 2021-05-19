const stopwatch = document.getElementById('stopwatch');
const limitReached = document.getElementById('limit-reached-msg')
const startBtnDOM = document.getElementById("start");

const elements = stopwatch.innerHTML.split(":")

let [hh, mm, ss] = elements
let timePaused = true;

resetStopwatchElements()

document.getElementById("start").onclick = function(){
    if (timePaused === true) {
        timePaused = false;
        startBtnDOM.value = 'Start'
        startTime();
    }    
}

document.getElementById("pause").onclick = function(){
    if (timePaused === false) {
        timePaused = true;
        startBtnDOM.value = 'Resume'
    }
}

document.getElementById("reset").onclick = function(){
    stopwatch.innerHTML = '00:00:00'
    timePaused = true;
    resetStopwatchElements()
}

function startTime() {
    if (timePaused == false) {
        hh = parseInt(hh)
        mm = parseInt(mm)
        ss = parseInt(ss)

        ss++
        if (ss === 60) {
            mm++
            ss = 0
        }
        if (mm === 60) {
            hh++
            mm = 0
            ss = 0
        }

        checkIfLimitReached();      

        ss = (ss < 10 || ss === 0) ? ss =  `0${ss}` : ss
        mm = (mm < 10 || mm === 0) ? mm =  `0${mm}` : mm
        hh = (hh < 10 || hh === 0) ? hh =  `0${hh}`: hh
        
        stopwatch.innerHTML =  `${hh}:${mm}:${ss}`
        // setTimeout(startTime, 0.1)
        setTimeout(startTime, 1000)
    }
}

function resetStopwatchElements()  {
    hh = 0;
    mm = 0;
    ss = 0;
    limitReached.innerHTML = ''
}

function checkIfLimitReached() {
    if (hh > 99) {
        timePaused = true
        hh = 99
        mm = 59
        ss = 59
        limitReached.innerHTML = 'Stopwatch limit reached!'
    }
}