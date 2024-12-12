const calculator = document.querySelector(".calculator")
const keysDiv = document.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')
const clearButton = document.querySelector('[data-action=clear]') //access elements holding particular dataset

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
      calculator.dataset.previousKeyType = 'number' //to reset the custom dataset because now the last key pressed is not an operator key 
    }

    if (action === "add" ||
      action === "multiply" ||
      action === "subtract" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
      calculator.dataset.firstValue = display.textContent //store these values for future use in calculation after the 2nd set of digits are clicked
      calculator.dataset.operator = action

      calculator.dataset.previousKeyType = 'operator' //record in the dataset of calculator div that the last pressed key was an operator, to refer to when updating the display
    }
    if (action === "decimal") {
      calculator.dataset.previousKeyType = "decimal"
    }
    if (action === 'clear') {
      if (key.textContent === 'AC') { //reset the stored data appropriately
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.modifierVal = '';
      } else {
        key.textContent = 'AC'
      }

      calculator.dataset.previousKeyType = 'clear'
    }
    if (action !== 'clear') { //if any button apart from 'clear', change AC to CE
      clearButton.textContent = 'CE';
    }
    if (action === 'calculate') {

      calculator.dataset.modifierVal = secondValue;
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
  const value1 = parseFloat(firstNum)
  const value2 = parseFloat(secondNum)

  //early return pattern (alternatively use switch case)
  if (operation === 'add') return value1 + value2
  if (operation === 'subtract') return value1 - value2
  if (operation === 'multiply') return value1 * value2
  if (operation === 'divide') return value1 / value2
}

const createResultString = (key, displayedNum, state) => { //state param requires passing calculator.dataset, which is like holding the current state of the calculator
  /*
  required vars:

  action
  displayedNum
  previousKeyType
  keyCOntent
  calculator.dataset.firstValue
  calculator.dataset.operator
  calculator.dataset.modifierVal
   */
  const action = key.dataset.action
  const previousKeyType = state.previousKeyType
  const keyContent = key.textContent
  const firstValue = state.firstValue
  const operator = state.operator
  const modifierVal = state.modifierVal

  if (!action) {
    return displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent //not addition but concatenation in strings
  }
  if (action === "decimal") {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.' //if a user directly hits the decimal after an operator, he'd mean 'zero point something'
    return displayedNum; //if none of above match, createResultString() should not return displayedNum instead of undefined
  }
  if (action === "add" ||
    action === "multiply" ||
    action === "subtract" ||
    action === "divide"
  ) {
    return (firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
    ) ? calculate(firstValue, operator, display.textContent)
      : displayedNum //in order not to return undefined if all conditions fail

  }
  if (action === "clear") {
    return 0;
  }
  if (action === "calculate") {
    return (firstValue)
      ? (previousKeyType === 'calculate') //if firstValue is truthy then run either calculate function, or else displayedNum
        ? calculate(displayedNum, operator, modifierVal)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}

