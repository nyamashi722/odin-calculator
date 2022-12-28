const buttons = document.querySelectorAll(".button");
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const fullDisplay = document.querySelector(".display")
const topDisplay = document.querySelector(".top-display")
const bottomDisplay = document.querySelector(".bottom-display")
const clear = document.querySelector(".clear")
const equals = document.querySelector(".equals")


let a;
let b;
let operatorSign;
let answer;
let topValue;
let bottomValue;

function add(a, b) {
    return (a + b);
};

function subtract(a, b) {
    return (a - b);
};

function multiply(a, b) {
    return (a * b);
};

function divide(a, b) {
    return (a / b);
};

function operate(a, b, operatorSign) {
    if (operatorSign === "+") {
        answer = add(a, b);
        return answer;
    } else if (operatorSign === "-") {
        answer = subtract(a, b);
        return answer;
    } else if (operatorSign === "*") {
        answer = multiply(a, b);
        return answer;
    } else if (operatorSign === "/") {
        answer = divide(a, b);
        return answer;
    };
};

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.dataset.selected && bottomDisplay.dataset.marked) {
            b = e.target.value;
            bottomDisplay.textContent = b;
            b = parseFloat(bottomDisplay.textContent);
            bottomDisplay.removeAttribute("data-marked")
        } else if (e.target.dataset.selected) {
            b = e.target.value;
            bottomDisplay.textContent += b;
            b = parseFloat(bottomDisplay.textContent);
        } else {
            a = e.target.value;
            bottomDisplay.textContent += a;
            a = parseFloat(bottomDisplay.textContent);
        }
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        operatorSign = e.target.value;
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].setAttribute("data-selected", "true")
        }
        bottomDisplay.setAttribute("data-marked", "true")
        topValue = a + " " + e.target.innerHTML;
        topDisplay.textContent = topValue;
    })
})

clear.addEventListener("click", () => {
    bottomDisplay.textContent = "";
    topDisplay.textContent = "";
    a = "";
    b = "";
    operatorSign = "";
    topValue = "";
    bottomValue = "";
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].removeAttribute("data-selected")
    }
})

equals.addEventListener("click", () => {
    if (bottomDisplay.textContent == answer) {
        topDisplay.textContent = topValue;
    } else {
        bottomDisplay.textContent = operate(a, b, operatorSign)
        topValue += " " + b + " " + "=";
        topDisplay.textContent = topValue; 
    }
})