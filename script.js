let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;

const display = document.getElementById("time-display");
const lapList = document.getElementById("lap-list");

function updateDisplay() {
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  const ms = String(milliseconds).padStart(2, '0');
  display.innerText = `${h}:${m}:${s}.${ms}`;
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    milliseconds += 1;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10); // 10ms = 1/100th of a second
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  lapList.innerHTML = "";
}

function recordLap() {
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  const ms = String(milliseconds).padStart(2, '0');
  const lapTime = `${h}:${m}:${s}.${ms}`;
  const lapItem = document.createElement("li");
  lapItem.innerText = `Lap - ${lapTime}`;
  lapList.appendChild(lapItem);
}

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);
document.getElementById("lap-btn").addEventListener("click", recordLap);
