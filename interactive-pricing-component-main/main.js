// 1. SELECT DOM ELEMENTS
const slider = document.getElementById("price-slider");
const pageviewsText = document.getElementById("pageviews-text");
const priceAmountText = document.getElementById("price-amount");
const billingToggle = document.getElementById("billing-toggle");

// 2. DEFINE PRICING DATA
// Storing data in an array makes the code clean and easy to update.
// The slider's value (0, 1, 2, 3, 4) will be the index for this array.
const pricingTiers = [
  { pageviews: "10K", price: 8 },
  { pageviews: "50K", price: 12 },
  { pageviews: "100K", price: 16 },
  { pageviews: "500K", price: 24 },
  { pageviews: "1M", price: 36 },
];

// 3. CREATE THE UPDATE FUNCTION
function updatePricing() {
  // Get the current pricing tier based on the slider's value
  const tierIndex = parseInt(slider.value);
  const currentTier = pricingTiers[tierIndex];

  // Check if the yearly billing toggle is checked
  const isYearly = billingToggle.checked;

  // Calculate the price, applying a 25% discount if yearly
  let price = currentTier.price;
  if (isYearly) {
    price = price * 0.75;
  }

  // Update the text content on the page
  pageviewsText.textContent = `${currentTier.pageviews} PAGEVIEWS`;
  priceAmountText.textContent = `$${price.toFixed(2)}`;

  // Update the slider's background gradient to show progress
  const sliderPercentage = (tierIndex / (pricingTiers.length - 1)) * 100;
  slider.style.background = `linear-gradient(to right, var(--clr-primary-300) ${sliderPercentage}%, var(--clr-neutral-300) ${sliderPercentage}%)`;
}

// 4. ATTACH EVENT LISTENERS
slider.addEventListener("input", updatePricing);
billingToggle.addEventListener("change", updatePricing);

// 5. INITIALIZE ON PAGE LOAD
// Run the function once to set the correct initial state
document.addEventListener("DOMContentLoaded", updatePricing);
