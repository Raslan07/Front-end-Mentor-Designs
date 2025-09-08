// JavaScript for Mobile Menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const openIcon = document.getElementById("menu-open-icon");
const closeIcon = document.getElementById("menu-close-icon");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  openIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// JavaScript for Mobile Dropdowns
const dropdownBtns = document.querySelectorAll(".mobile-dropdown-btn");

dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const dropdownContent = btn.nextElementSibling;
    dropdownContent.classList.toggle("hidden");
    // Rotate arrow icon
    btn.querySelector("svg").classList.toggle("rotate-180");
  });
});
