const toggleBTn = document.querySelector("#billing-toggle");
const priceSection = document.querySelectorAll(".price");

// monthly vs yearly prices
const monthlyPrices = ["$19.99", "$24.99", "$39.99"];
const yearlyPrices = ["$199.99", "$249.99", "$399.99"];

toggleBTn.addEventListener("input", updatePrice);

function updatePrice() {
  // if checked → yearly, else → monthly
  const currentPrices = toggleBTn.checked ? monthlyPrices : yearlyPrices;

  priceSection.forEach((el, i) => {
    el.textContent = currentPrices[i];
  });
}
