const buttons = document.querySelectorAll(".button");
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const fullDisplay = document.querySelector(".display")
const topDisplay = document.querySelector(".top-display")
const bottomDisplay = document.querySelector(".bottom-display")
const clear = document.querySelector(".clear")
const equals = document.querySelector(".equals")
const decimal = document.querySelector(".decimal")
const backspace = document.querySelector(".backspace")

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
        bottomDisplay.textContent = answer;
        return answer;
    } else if (operatorSign === "-") {
        answer = subtract(a, b);
        bottomDisplay.textContent = answer;
        return answer;
    } else if (operatorSign === "*") {
        answer = multiply(a, b);
        bottomDisplay.textContent = answer;
        return answer;
    } else if (operatorSign === "/") {
        answer = divide(a, b);
        bottomDisplay.textContent = answer;
        return answer;
    };
};

//selected = next number will be "b"
//marked = to remove current bottomDisplay numbers
//primed = new answer 

function buttonA(e) {
    a = e.target.value;
    bottomDisplay.textContent += a;
    a = parseFloat(bottomDisplay.textContent);
}

function buttonBOne(e) {
    b = e.target.value;
    bottomDisplay.textContent = b;
    b = parseFloat(bottomDisplay.textContent);
    bottomDisplay.setAttribute("data-primed", "true")
    bottomDisplay.removeAttribute("data-marked")
}

function buttonBTwo(e) {
    b = e.target.value;
    bottomDisplay.textContent += b;
    b = parseFloat(bottomDisplay.textContent);
    bottomDisplay.setAttribute("data-primed", "true")
    bottomDisplay.removeAttribute("data-marked")
}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (bottomDisplay.dataset.answer) {
            return false;
        } else if (e.target.dataset.selected && bottomDisplay.dataset.marked && bottomDisplay.textContent) {
            if (bottomDisplay.textContent == "0") {
                if (e.target.value == ".") {
                    bottomDisplay.textContent = "0";
                    buttonBOne(e);
                } else {
                    bottomDisplay.textContent = "";
                    buttonBOne(e);
                }
            } else if (e.target.value == "." && bottomDisplay.textContent.includes(".")) {
                return false
            } else {
                if (e.target.value == "." && (bottomDisplay.textContent == answer || bottomDisplay.textContent == "")) {
                    bottomDisplay.textContent = "0";
                    buttonBTwo(e);
                } else {
                    buttonBOne(e);
                }
            }
        } else if (e.target.dataset.selected) {
            if (bottomDisplay.textContent == "0") {
                if (e.target.value == ".") {
                    bottomDisplay.textContent = "0"
                    buttonBTwo(e);
                } else {
                    bottomDisplay.textContent = "";
                    buttonBTwo(e);
                }
            } else if (e.target.value == "." && bottomDisplay.textContent.includes(".")) {
                return false
            } else {
                if (e.target.value == "." && (bottomDisplay.textContent == answer || bottomDisplay.textContent == "")) {
                    bottomDisplay.textContent = "0";
                    buttonBTwo(e);
                } else {
                    buttonBTwo(e)
                }
            }
        } else {
            if (bottomDisplay.textContent == "0") {
                if (e.target.value == ".") {
                    bottomDisplay.textContent = "0"
                    buttonA(e);
                } else {
                    bottomDisplay.textContent = "";
                    buttonA(e);
                }
            } else if (e.target.value == "." && bottomDisplay.textContent.includes(".")) {
                return false
            } else {
                if (e.target.value == "." && bottomDisplay.textContent == "") {
                    bottomDisplay.textContent = "0"
                    buttonA(e);
                } else {
                    buttonA(e);
                }
            }
        }
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (bottomDisplay.dataset.primed && bottomDisplay.dataset.marked) {
            operatorSign = e.target.value;
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].setAttribute("data-selected", "true")
            }
            bottomDisplay.setAttribute("data-marked", "true")
            bottomDisplay.removeAttribute("data-answer")
            topValue = a + " " + e.target.innerHTML;
            topDisplay.textContent = topValue;
            bottomDisplay.textContent = "";
        } else if (bottomDisplay.dataset.primed) {
            if (b == 0 && operatorSign == "/") {
                alert ("You can't divide by 0")
            } else {
                operate(a, b, operatorSign)
                topValue += " " + b + " " + e.target.innerHTML;
                topDisplay.textContent = topValue;
                operatorSign = e.target.value;
                bottomDisplay.setAttribute("data-marked", "true")
                bottomDisplay.removeAttribute("data-answer")
                a = answer;
            }
        } else if (topDisplay.textContent == "" && bottomDisplay.textContent == "") {
            operatorSign = e.target.value;
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].setAttribute("data-selected", "true")
            }
            bottomDisplay.setAttribute("data-marked", "true")
            bottomDisplay.removeAttribute("data-answer")
            topDisplay.textContent = "0" + " " + e.target.innerHTML;
            bottomDisplay.textContent = "";
            a = "";
            topValue = `0 ${e.target.innerHTML}`
        } else if (bottomDisplay.dataset.marked && ((topDisplay.textContent == "0 +") || (topDisplay.textContent == "0 ???") || (topDisplay.textContent == "0 ??") || (topDisplay.textContent == "0 ??"))) {
            operatorSign = e.target.value;
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].setAttribute("data-selected", "true")
            }
            bottomDisplay.setAttribute("data-marked", "true")
            bottomDisplay.removeAttribute("data-answer")
            topDisplay.textContent = "0" + " " + e.target.innerHTML;
            bottomDisplay.textContent = "";
            a = "";
            topValue = `0 ${e.target.innerHTML}`
        } else {
            operatorSign = e.target.value;
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].setAttribute("data-selected", "true")
            }
            bottomDisplay.setAttribute("data-marked", "true")
            bottomDisplay.removeAttribute("data-answer")
            topValue = a + " " + e.target.innerHTML;
            topDisplay.textContent = topValue;
            bottomDisplay.textContent = "";
        }
    })
})

clear.addEventListener("click", () => {
    bottomDisplay.textContent = "";
    bottomDisplay.removeAttribute("data-primed");
    bottomDisplay.removeAttribute("data-marked")
    bottomDisplay.removeAttribute("data-answer")
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
    if (bottomDisplay.dataset.answer) {
        bottomDisplay.removeAttribute("data-primed");
    } else if (!bottomDisplay.textContent) {
        bottomDisplay.removeAttribute("data-primed");
    } else if (bottomDisplay.dataset.primed && bottomDisplay.dataset.marked) {
        return false;
    } else if (bottomDisplay.dataset.primed) {
        if (b == 0 && operatorSign == "/") {
            alert("You can't divide by 0, please select a different number")
        } else {
            operate(a, b, operatorSign)
            topValue += " " + b + " " + "=";
            topDisplay.textContent = topValue;
            a = answer;
            bottomDisplay.removeAttribute("data-primed");
            bottomDisplay.setAttribute("data-answer", "true")
        }
    }
})

backspace.addEventListener("click", () => {
    if (bottomDisplay.dataset.primed || bottomDisplay.dataset.marked) {
        if (bottomDisplay.textContent.length == 1) {
            bottomDisplay.textContent = 0;
            b = parseFloat(bottomDisplay.textContent)
        } else {
            bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1)
            b = parseFloat(bottomDisplay.textContent)
        }
    } else if (bottomDisplay.dataset.answer) {
        return false;
    } else {
        if (bottomDisplay.textContent.length == 1) {
            bottomDisplay.textContent = 0;
            a = parseFloat(bottomDisplay.textContent)
        } else {
            bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1)
            a = parseFloat(bottomDisplay.textContent)
        }
    }
})