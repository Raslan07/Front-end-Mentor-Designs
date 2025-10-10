const inputEmail = document.querySelector("#email-bar")
const small = document.querySelector("small")
const btn = document.getElementById("notify-btn");


btn.addEventListener("click", isEmpty);

function isEmpty(){
    const currentValue = inputEmail.value;
    if (currentValue === "" || currentValue !== "string") {
    inputEmail.classList.add("error");
    small.classList.add("error");
    inputEmail.placeholder = "example@email.com";
    } else if (CheckEmailReg(currentValue) ) {
    
    inputEmail.classList.remove("error");
    small.classList.remove("error");
    } else {
    console.log("Hi");
    }
}

function CheckEmailReg(inputValue){
    const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEX.test(inputValue);
}
