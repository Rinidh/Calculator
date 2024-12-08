const calculator = document.querySelector(".calculator")
const keysDiv = document.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')

keysDiv.addEventListener("click", e => {
  if (e.target.matches('button')) {
    //the code in this block re-runs on each button-click

    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType;
    // console.log(previousKeyType);

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent //not addition but concatenation in strings
      }

      calculator.dataset.previousKeyType = 'number' //to reset the custom dataset because now the last key pressed is not an operator key 
    }
    if (action === "add" || action === "multiply" || action === "subtract" || action === "divide") {
      key.classList.add("is-depressed");
      calculator.dataset.firstValue = display.textContent //store these values for future use in calculation after the 2nd set of digits are clicked
      calculator.dataset.operator = action

      calculator.dataset.previousKeyType = 'operator' //record in the dataset of calculator div that the last pressed key was an operator, to refer to when updating the display
      console.log('set to operator');

    }
    if (action === "decimal") {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      }
      if (previousKeyType === 'operator') {
        display.textContent = '0.' //if a user directly hits the decimal after an operator, he'd mean 'zero point something'
      }

      calculator.dataset.previousKeyType = "decimal"
    }
    if (action === 'clear') {
      console.log('ac button');

      calculator.dataset.previousKeyType = 'clear'
    }
    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue
      const secondValue = displayedNum //the 2nd set of digits on screen after the operator was clicked
      const operator = calculator.dataset.operator

      const result = calculate(firstValue, operator, secondValue)
      display.textContent = result;

      calculator.dataset.previousKeyType = 'calculate'
    }

    //each time any key is pressed, all four operator buttons will have 'is-depressed' class removed
    const keys = Array.from(keysDiv.children)
    const operatorKeys = keys.filter(k => k.classList.contains('key--operator'))
    operatorKeys
      .forEach(k => {
        k.classList.remove('is-depressed')
      })
  }
})

function calculate(firstNum, operation, secondNum) {
  let result;

  if (operation === 'add') {
    result = parseFloat(firstNum) + parseFloat(secondNum);
  } else if (operation === 'subtract') {
    result = parseFloat(firstNum) - parseFloat(secondNum);
  } else if (operation === 'multiply') {
    result = parseFloat(firstNum) * parseFloat(secondNum);
  } else if (operation === 'divide') {
    result = parseFloat(firstNum) / parseFloat(secondNum);
  }

  return result;
}

