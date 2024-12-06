const buttons = document.querySelectorAll("button")
const screen = document.getElementsByClassName("screen")[0]

// console.log(buttons);

let valuePosition = 1; //stores the position of argument eg in 27+34, 27 has valuePositon of 1 and 34 has valuePosition of 2
let firstValue = ""; //first temporarily store values in string form to prevent += operator from adding the input numbers eg 5, 2 should be 52, not 7
let secondValue = "";
let arithmeticOperator = "+" | "-" | "×" | "÷" //multiplication sign is NOT letter x

buttons.forEach(button => {
  //actions for buttons having number inputs
  if (button.id && button.id !== "button-dot" && button.id !== "button-clear") {
    button.addEventListener("click", e => {
      if (screen.innerText === "0") {
        screen.innerText = e.target.innerText;
        storeValue(e.target.innerText)
      } else {
        screen.innerText += e.target.innerText;
        storeValue(e.target.innerText)
      }
    })
  }

  //actions for dot button
  if (button.id === "button-dot") {
    button.addEventListener("click", e => {
      if (!screen.innerText.includes(".")) {
        screen.innerText += e.target.innerText;
        storeValue(e.target.innerText)
      }
    })
  }

  //actions for clear button
  if (button.id === "button-clear") {
    button.addEventListener("click", e => {
      screen.innerText = "0"
    })
  }

  //actions for arithmetic-operators
  if (button.classList.contains("arithmetic-operator")) {
    button.addEventListener("click", e => {
      arithmeticOperator = e.target.innerText;
      changeValuePosition(valuePosition + 1);
      screen.innerText = e.target.innerText;
    })
  }

  // //actions for equals button
  if (button.classList.contains("equals-operator")) {
    button.addEventListener("click", e => {
      const result = doCalculation(firstValue, secondValue, arithmeticOperator);
      screen.innerText = result;
      resetVariables();
    })
  }
})

// document.addEventListener("click", () => console.log(valuePosition, firstValue, secondValue, arithmeticOperator))


function storeValue(value) {
  if (valuePosition === 1) {
    firstValue += value;
  } else if (valuePosition === 2) {
    secondValue += value;
  }
}
function changeValuePosition(newPosition) {
  valuePosition = newPosition;
}
function doCalculation(firstValue, secondValue, arithmeticOperator) {
  switch (arithmeticOperator) {
    case "+":
      return parseInt(firstValue) + parseInt(secondValue)
    case "-":
      return parseInt(firstValue) - parseInt(secondValue)
    case "×":
      return parseInt(firstValue) * parseInt(secondValue)
    case "÷":
      return parseInt(firstValue) / parseInt(secondValue)
  }
}
function resetVariables() {
  valuePosition = 1;
  firstValue = "";
  secondValue = "";
}