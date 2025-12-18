
/* -----------------------------
   Element references (constants)
   ----------------------------- */
const toggle = document.getElementById("toggle-input");
const toggleLabel = document.getElementsByClassName("toggle-label")[0];
const body = document.body;

/* -----------------------------
   Helpers
   ----------------------------- */
/**
 * updateToggleLabel - Updates the visible label text and keeps aria state in sync.
 * - Shows "Dark Mode" when the `.dark` class is present on <body>
 * - Shows "Light Mode" otherwise
 */
function updateToggleLabel() {
  toggleLabel.textContent = body.classList.contains("dark")
    ? "Dark Mode"
    : "Light Mode";
  // Keep the accessible state in sync with the actual checkbox
  toggle.setAttribute("aria-checked", toggle.checked);
}



/* -----------------------------
   Core logic
   ----------------------------- */
/**
 * applyTheme - Applies 'dark' or 'light' theme to the page.
 * - Adds/removes `.dark` on <body>
 * - Updates the toggle checked state
 * - Persists the user's choice in localStorage
 * - Updates label and aria state
 * @param {'dark'|'light'} theme
 */
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    toggle.checked = true; // keep toggle UI in sync
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    toggle.checked = false;
    localStorage.setItem("theme", "light");
  }

  updateToggleLabel();
}

/* -----------------------------
    Event listeners
   ----------------------------- */
// Listen for user interaction with the toggle and apply the chosen theme
toggle.addEventListener("change", () =>
  applyTheme(toggle.checked ? "dark" : "light")
);

// End of file - clean and well-commented
