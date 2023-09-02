import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  pickDate: document.querySelector('#datetime-picker'),
  entireTimer: document.querySelector('.timer'),
  btnStart: document.querySelector('[data-start]'),
  fieldDays: document.querySelector('[data-days]'),
  fieldHours: document.querySelector('[data-hours]'),
  fieldMinutes: document.querySelector('[data-minutes]'),
  fieldSeconds: document.querySelector('[data-seconds]'),
  spans: document.querySelectorAll('.value'),
};

document.querySelector('button[data-start]').style.height = '28px';

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      Notify.success('Shall we start?');
    }
  },
};

flatpickr(refs.pickDate, options);

refs.btnStart.addEventListener('click', () => {
  let timerId = setInterval(() => {
    let timeCount = new Date(refs.pickDate.value) - new Date();
    refs.btnStart.disabled = true;
    refs.spans.forEach(item => item.classList.toggle('end'));
    if (timeCount >= 0) {
      let totalCount = convertMs(timeCount);
      refs.fieldDays.textContent = addLeadingZero(totalCount.days);
      refs.fieldHours.textContent = addLeadingZero(totalCount.hours);
      refs.fieldMinutes.textContent = addLeadingZero(totalCount.minutes);
      refs.fieldSeconds.textContent = addLeadingZero(totalCount.seconds);
      refs.entireTimer.style.color = 'tomato';
      if (timeCount < 1000) {
        refs.spans.forEach(item => item.classList.toggle('end'));
        clearInterval(timerId);
        refs.entireTimer.style.color = 'black';
        Notify.success('Countdown finished');
      }
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
