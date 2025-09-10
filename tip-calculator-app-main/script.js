document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element Selections ---
  const form = document.getElementById("tip-calculator-form");
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".tip-button");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalPerPersonDisplay = document.getElementById("total-per-person");
  const resetButton = document.getElementById("reset-btn");
  const peopleError = document.getElementById("people-error");

  // --- State Management ---
  let billValue = 0.0;
  let peopleValue = 0;
  let tipPercent = 0;

  // --- Core Functions ---

  /**
   * Calculates the tip and total per person and updates the UI.
   */
  const calculateAndDisplay = () => {
    // Validate number of people
    if (peopleValue === 0) {
      peopleError.style.display = "inline";
      peopleInput.classList.add("input-field--error");
      // Don't calculate if invalid
      return;
    } else {
      peopleError.style.display = "none";
      peopleInput.classList.remove("input-field--error");
    }

    // Perform calculations
    const tipTotal = billValue * (tipPercent / 100);
    const tipPerPerson = tipTotal / peopleValue;
    const totalPerPerson = (billValue + tipTotal) / peopleValue;

    // Update UI with formatted values
    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalPerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

    // Re-enable reset button once a calculation is made
    resetButton.disabled = false;
  };

  /**
   * Handles tip selection from buttons.
   * @param {Event} event - The click event from a tip button.
   */
  const handleTipButtonClick = (event) => {
    // Remove active state from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active state to the clicked button
    event.target.classList.add("active");

    // Clear custom tip input
    customTipInput.value = "";

    // Update state and recalculate
    tipPercent = parseFloat(event.target.dataset.tip);
    calculateAndDisplay();
  };

  /**
   * Resets the entire calculator to its initial state.
   */
  const handleReset = () => {
    billValue = 0.0;
    peopleValue = 0;
    tipPercent = 0;

    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";

    tipAmountDisplay.textContent = "$0.00";
    totalPerPersonDisplay.textContent = "$0.00";

    tipButtons.forEach((btn) => btn.classList.remove("active"));
    peopleError.style.display = "none";
    peopleInput.classList.remove("input-field--error");

    resetButton.disabled = true;
  };

  // --- Event Listeners ---

  billInput.addEventListener("input", (e) => {
    billValue = parseFloat(e.target.value) || 0;
    calculateAndDisplay();
  });

  peopleInput.addEventListener("input", (e) => {
    // Use Math.trunc to ensure whole numbers for people
    peopleValue = Math.trunc(parseFloat(e.target.value)) || 0;
    calculateAndDisplay();
  });

  customTipInput.addEventListener("input", (e) => {
    tipPercent = parseFloat(e.target.value) || 0;
    // Remove active state from preset tip buttons when using custom
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    calculateAndDisplay();
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", handleTipButtonClick);
  });

  // Use the form's reset event for semantic correctness
  form.addEventListener("reset", handleReset);
});
