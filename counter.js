let count = 0;
let isRunning = false;
let timer;
let customInterval;
let targetCount;
let beepSound = new Audio("beep-09.mp3");

// Set maximum volume for louder effect
beepSound.volume = 1.0;

function updateButtons(state) {
    document.getElementById("startBtn").style.display = state === "stopped" ? "inline-block" : "none";
    document.getElementById("pauseBtn").style.display = state === "running" ? "inline-block" : "none";
    document.getElementById("resumeBtn").style.display = state === "paused" ? "inline-block" : "none";
    document.getElementById("resetBtn").style.display = state !== "stopped" ? "inline-block" : "none";
}

function startStopwatch() {
    const intervalInput = document.getElementById("customInterval").value;
    const targetInput = document.getElementById("targetCount").value;

    customInterval = parseInt(intervalInput);
    targetCount = parseInt(targetInput);

    if (isNaN(customInterval) || customInterval <= 0) {
        alert("Please enter a valid positive number for the interval.");
        return;
    }
    if (isNaN(targetCount) || targetCount <= 0) {
        alert("Please enter a valid positive number for the target count.");
        return;
    }

    isRunning = true;
    updateButtons("running");

    timer = setInterval(() => {
        count++;
        document.getElementById("count").innerText = count;

        if (count >= targetCount) {
            beepSound.play();
            clearInterval(timer);
            alert("Target count reached!");
            resetStopwatch();
        }
    }, customInterval * 1000);
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(timer);
    updateButtons("paused");
}

function resumeStopwatch() {
    isRunning = true;
    updateButtons("running");
    timer = setInterval(() => {
        count++;
        document.getElementById("count").innerText = count;

        if (count >= targetCount) {
            beepSound.play();
            clearInterval(timer);
            alert("Target count reached!");
            resetStopwatch();
        }
    }, customInterval * 1000);
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    count = 0;
    document.getElementById("count").innerText = count;
    updateButtons("stopped");
}
