document.addEventListener("DOMContentLoaded", () => {
  // Select all necessary elements once at the start.
  const form = document.getElementById("sign-up");
  const firstName = document.getElementById("First");
  const lastName = document.getElementById("Scound");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // Listen for the 'submit' event on the form itself.
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from actually submitting
    checkInputs(); // Run our validation function
  });

  // Helper function to add the error classes and message
  function setErrorFor(input, message) {
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector("small");

    small.innerText = message;
    formControl.classList.add("error");
  }

  // Helper function to remove the error classes
  function setSuccessFor(input) {
    const formControl = input.parentElement; // .form-control
    formControl.classList.remove("error");
  }

  // Helper function to check if an email is valid using Regex
  function isEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Main validation function that orchestrates everything.
  function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // Check First Name
    if (firstNameValue === "") {
      setErrorFor(firstName, "First Name cannot be empty");
    } else {
      setSuccessFor(firstName);
    }

    // Check Last Name
    if (lastNameValue === "") {
      setErrorFor(lastName, "Last Name cannot be empty");
    } else {
      setSuccessFor(lastName);
    }

    // Check Email
    if (emailValue === "") {
      setErrorFor(email, "Email cannot be empty");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Looks like this is not an email");
    } else {
      setSuccessFor(email);
    }

    // Check Password
    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be empty");
    } else {
      setSuccessFor(password);
    }
  }
});
