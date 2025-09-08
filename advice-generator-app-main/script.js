// Wait for the HTML to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    const adviceIdElement = document.querySelector(".advice-card__id");
    const adviceQuoteElement = document.querySelector(".advice-card__quote");
    const generateBtn = document.querySelector(".advice-card__button");
    const API_URL = "https://api.adviceslip.com/advice";


    const renderAdvice = (id, advice) => {
    adviceIdElement.textContent = id;
    adviceQuoteElement.textContent = `“${advice}”`;
};

  // Async function to fetch advice from the API
    const fetchAdvice = async () => {

    generateBtn.disabled = true;
    adviceQuoteElement.textContent = "Load advice...";

    try {
      // Use no-cache to prevent the API from sending the same advice repeatedly
        const response = await fetch(API_URL, { cache: "no-cache" });

      // Check if the network response was successful
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        const { id, advice } = data.slip;
        renderAdvice(id, advice);
    } catch (error) {
      // 2. Handle potential errors gracefully
        console.error("Failed to fetch advice:", error);
        adviceQuoteElement.textContent =
        "⚠️ Sorry, could not fetch advice. Please try again!";
    } finally {
        generateBtn.disabled = false;
    }
};

    generateBtn.addEventListener("click", fetchAdvice);
});
