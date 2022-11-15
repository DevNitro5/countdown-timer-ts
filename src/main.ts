import "./style.css";

let interval: number;

const hoursEl = document.querySelector<HTMLInputElement>(".hours")!;
const minutesEl = document.querySelector<HTMLInputElement>(".minutes")!;
const secondsEl = document.querySelector<HTMLInputElement>(".seconds")!;

const startBtn = document.querySelector<HTMLButtonElement>(".start")!;
const stopBtn = document.querySelector<HTMLButtonElement>(".stop")!;
const resetBtn = document.querySelector<HTMLButtonElement>(".reset")!;

[hoursEl, minutesEl, secondsEl].forEach((inputEl) => {
  inputEl.addEventListener("input", (event) => {
    const inputEl = event.target as HTMLInputElement;
    inputEl.value = inputEl.value.slice(0, 2);
  });
});

function getTimer() {
  return {
    hours: +hoursEl.value,
    minutes: +minutesEl.value,
    seconds: +secondsEl.value,
  };
}

function setTimer(hours: number, minutes: number, seconds: number) {
  const value = (time: number) => (time < 10 ? "0" + time : "" + time);
  hoursEl.value = value(hours);
  minutesEl.value = value(minutes);
  secondsEl.value = value(seconds);
}

function reset() {
  hoursEl.value = minutesEl.value = secondsEl.value = "";
  startBtn.style.display = "initial";
  stopBtn.style.display = "none";
}

startBtn.addEventListener("click", () => {
  const { hours, minutes, seconds } = getTimer();

  if (hours === 0 && minutes === 0 && seconds === 0) return;

  startBtn.style.display = "none";
  stopBtn.style.display = "initial";

  setCountDownTimer();
  countDown();

  interval = setInterval(() => {
    if (countDown()) {
      reset();
      clearInterval(interval);
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  startBtn.style.display = "initial";
  stopBtn.style.display = "none";
});

resetBtn.addEventListener("click", reset);

type isCompleted = boolean;
function countDown(): isCompleted {
  let { hours, minutes, seconds } = getTimer();

  if (hours === 0 && minutes === 0 && seconds === 0) return true;

  if (minutes === 0 && hours !== 0) {
    setTimer(hours - 1, 60, seconds);
  }

  ({ hours, minutes, seconds } = getTimer());

  if (seconds === 0 && minutes !== 0) {
    setTimer(hours, minutes - 1, 59);
    return false;
  }

  setTimer(hours, minutes, seconds - 1);

  return false;
}

function setCountDownTimer() {
  let { hours, minutes, seconds } = getTimer();

  if (seconds > 60) {
    minutes += Math.floor(seconds / 60);
    seconds %= 60;
  }

  if (minutes > 60) {
    hours += Math.floor(minutes / 60);
    minutes %= 60;
  }

  setTimer(hours, minutes, seconds);
}
