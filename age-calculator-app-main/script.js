// DOM Elements
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateBtn = document.getElementById("calculate-btn");

const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const resultYears = document.getElementById("result-years");
const resultMonths = document.getElementById("result-months");
const resultDays = document.getElementById("result-days");

calculateBtn.addEventListener("click", () => {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  if (validateInputs(day, month, year)) {
    calculateAge(day, month, year);
  }
});

function validateInputs(day, month, year) {
  let isValid = true;
  const today = new Date();
  const currentYear = today.getFullYear();

  // Clear previous errors
  clearErrors();

  // --- Validation Logic ---

  // Day validation
  if (isNaN(day)) {
    showError(dayInput, dayLabel, dayError, "This field is required");
    isValid = false;
  } else if (day < 1 || day > 31) {
    showError(dayInput, dayLabel, dayError, "Must be a valid day");
    isValid = false;
  }

  // Month validation
  if (isNaN(month)) {
    showError(monthInput, monthLabel, monthError, "This field is required");
    isValid = false;
  } else if (month < 1 || month > 12) {
    showError(monthInput, monthLabel, monthError, "Must be a valid month");
    isValid = false;
  }

  // Year validation
  if (isNaN(year)) {
    showError(yearInput, yearLabel, yearError, "This field is required");
    isValid = false;
  } else if (year > currentYear) {
    showError(yearInput, yearLabel, yearError, "Must be in the past");
    isValid = false;
  }

  // Full date validation
  if (isValid && !isNaN(day) && !isNaN(month) && !isNaN(year)) {
    const birthDate = new Date(year, month - 1, day);
    // Check if the day is valid for the given month and year (e.g., handles Feb 30)
    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getDate() !== day
    ) {
      showError(dayInput, dayLabel, dayError, "Must be a valid date");
      showError(monthInput, monthLabel, monthError, "");
      showError(yearInput, yearLabel, yearError, "");
      isValid = false;
    } else if (birthDate > today) {
      showError(dayInput, dayLabel, dayError, "Must be in the past");
      showError(monthInput, monthLabel, monthError, "");
      showError(yearInput, yearLabel, yearError, "");
      isValid = false;
    }
  }

  return isValid;
}

function showError(input, label, errorEl, message) {
  input.classList.add("error-input");
  label.classList.add("error-label");
  errorEl.textContent = message;
}

function clearErrors() {
  dayInput.classList.remove("error-input");
  monthInput.classList.remove("error-input");
  yearInput.classList.remove("error-input");

  dayLabel.classList.remove("error-label");
  monthLabel.classList.remove("error-label");
  yearLabel.classList.remove("error-label");

  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";
}

function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Animate the results
  animateValue(resultYears, 0, years, 500);
  animateValue(resultMonths, 0, months, 500);
  animateValue(resultDays, 0, days, 500);
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
