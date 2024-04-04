
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const dateTimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
      console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr(dateTimePicker, options);

let countdownInterval; 

function startCountdown() {
  const targetDate = userSelectedDate.getTime();
  countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const difference = targetDate - currentDate;
    if (difference <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: "Success",
        message: "Countdown completed!",
      });
      resetTimer();
    } else {
      const { days, hours, minutes, seconds } = convertMs(difference);
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  startCountdown();
});

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function resetTimer() {
  clearInterval(countdownInterval);
  daysElement.textContent = "00";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
  startButton.disabled = false;
  dateTimePicker.disabled = false;
}
