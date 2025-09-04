const container = document.querySelector(".container");
const successPage = document.querySelector(".success-page");
const inputField = document.querySelector(".email");
const successBTN = document.querySelector(".btn-one");
const failBTN = document.querySelector(".btn-two");
const email = document.querySelector(".text p .email-user");
const small = document.querySelector(".erorr");

successBTN.addEventListener("click", checkEmail);

function checkEmail(e) {
  e.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (inputField.value.toLowerCase().match(emailRegex)) {
    container.classList.add("hidden");
    successPage.classList.remove("hidden");
    email.textContent = inputField.value;
    resetError();
  } else {
    ErorrMSG();
  }
}

function ErorrMSG() {
  small.classList.add("show");
  inputField.style.background = "#f78ca05e";
  inputField.style.border = "1px solid #f78c9f";
  inputField.style.color = "#ff4769ff";
}

function resetError() {
  small.classList.remove("show");
  inputField.style.background = "";
  inputField.style.border = "";
  inputField.style.color = "";
}

failBTN.addEventListener("click", returnPageOne);

function returnPageOne(e) {
  e.preventDefault();
  container.classList.remove("hidden");
  successPage.classList.add("hidden");
}
