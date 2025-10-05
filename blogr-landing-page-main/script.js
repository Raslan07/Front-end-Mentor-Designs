// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Smooth Scrolling for internal links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only smooth scroll for actual anchor links, not empty ones
      if (href && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Dropdown Menu Handling (for better mobile support)
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const dropdownLink = dropdown.querySelector(".nav-link");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    if (dropdownLink && dropdownMenu) {
      // Handle mobile dropdown toggle
      dropdownLink.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();

          // Close other dropdowns
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("active");
            }
          });

          // Toggle current dropdown
          dropdown.classList.toggle("active");
        }
      });
    }
  });

  // Button Click Handlers
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add a subtle click feedback
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Login and Signup button handlers
  const loginBtn = document.querySelector(".btn-login");
  const signupBtn = document.querySelector(".btn-signup");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      console.log("Login button clicked");
      // Here you would typically redirect to a login page or open a login modal
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      console.log("Sign up button clicked");
      // Here you would typically redirect to a signup page or open a signup modal
    });
  }

  // Hero button handlers
  const startFreeBtn = document.querySelector(".btn-primary");
  const learnMoreBtn = document.querySelector(".btn-outline");

  if (startFreeBtn) {
    startFreeBtn.addEventListener("click", function () {
      console.log("Start for Free button clicked");
      // Here you would typically redirect to a signup/registration page
    });
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", function () {
      console.log("Learn More button clicked");
      // Here you could scroll to a specific section or open more information
      const futureSection = document.querySelector(".future-section");
      if (futureSection) {
        futureSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Handle window resize for responsive behavior
  window.addEventListener("resize", function () {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.getElementById("hamburger");

    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768 && navMenu && hamburger) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }

    // Close mobile dropdowns on resize
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  });

  // Add scroll-based animations (optional enhancement)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const sections = document.querySelectorAll(
    ".future-section, .infrastructure-section, .features-section"
  );
  sections.forEach((section) => {
    // Set initial state
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.6s ease-out";

    // Observe for intersection
    observer.observe(section);
  });

  // Parallax effect for hero section (subtle)
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero");

    if (heroSection && scrolled < window.innerHeight) {
      const rate = scrolled * -0.3;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });

  console.log("Blogr landing page initialized successfully");
});
