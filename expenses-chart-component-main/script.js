// Data directly from data.json
const weeklyData = [
  { day: "mon", amount: 17.45 },
  { day: "tue", amount: 34.91 },
  { day: "wed", amount: 52.36 },
  { day: "thu", amount: 31.07 },
  { day: "fri", amount: 23.39 },
  { day: "sat", amount: 43.28 },
  { day: "sun", amount: 25.48 },
];

const chartContainer = document.getElementById("chart-area");

function renderChart() {
  // 1. Find the maximum amount in the dataset to calculate relative height
  // Spreading (...) the array of amounts into Math.max
  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  // 2. Determine current day for the "active" cyan state
  // JS getDay(): 0 is Sunday, 1 is Monday...
  const date = new Date();
  let dayIndex = date.getDay();
  // Adjust because our data starts with Monday, but getDay starts with Sunday
  // Map JS getDay index to our data array structure
  // JS: Sun(0), Mon(1), Tue(2)...
  // Data: Mon, Tue, Wed...

  // Let's create a mapper for string comparison to be safe
  const dayNameMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDayName = dayNameMap[dayIndex];

  // 3. Loop and Create
  weeklyData.forEach((item) => {
    // Calculate percentage height
    // We multiply by slightly less than 100 or use the full height container logic
    const heightPercentage = (item.amount / maxAmount) * 100;

    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    // Check if this item is today
    const isActive = item.day === currentDayName ? "active" : "";

    // Updated structure: Tooltip is now inside the bar for correct relative positioning
    barContainer.innerHTML = `
          <div class="bar ${isActive}" style="height: ${heightPercentage}%;">
            <div class="tooltip">$${item.amount}</div>
          </div>
          <p class="day-label">${item.day}</p>
        `;

    chartContainer.appendChild(barContainer);
  });
}

// Run the function
renderChart();
