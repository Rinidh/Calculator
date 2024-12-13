const calculator = document.querySelector(".calculator")
const keysDiv = document.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')
const clearButton = document.querySelector('[data-action=clear]') //access elements holding particular dataset

keysDiv.addEventListener("click", e => {
  if (!e.target.matches('button')) return; //if target was not a button, don't do anything

  //all code below re-runs on each button-click

  const key = e.target
  const displayedNum = display.textContent

  //Handling the pure functions (arithmetic to performs) with createResultString() and showing result on display
  display.textContent = createResultString(key, displayedNum, calculator.dataset)

  //Handling the impure part (changing other variables accordingly)
  updateCalculatorState(key, calculator.dataset, displayedNum)
})

const updateCalculatorState = (key, state, displayedNum) => {
  const { firstValue, previousKeyType, modifierVal } = state
  const keyType = getKeyType(key)
  calculator.dataset.previousKeyType = keyType //set previous keyType at one point instead of in each case below

  if (keyType === "operator") {
    key.classList.add("is-depressed");
    calculator.dataset.firstValue = display.textContent //store these values for future use in calculation after the 2nd set of digits are clicked
    calculator.dataset.operator = action
  }
  if (action === 'clear') {
    if (key.textContent === 'AC') { //reset the stored data appropriately
      calculator.dataset.firstValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.modifierVal = '';
      calculator.dataset.previousKeyType = ''
    } else {
      key.textContent = 'AC'
    }
  }
  if (action !== 'clear') { //if any button apart from 'clear', change AC to CE
    clearButton.textContent = 'CE';
  }
  if (action === 'calculate') {
    calculator.dataset.modifierVal = firstValue && previousKeyType === 'calculate'
      ? modifierVal
      : displayedNum
  }

  //each time any key is pressed, all four operator buttons will have 'is-depressed' class removed
  const keys = Array.from(keysDiv.children)
  const operatorKeys = keys.filter(k => k.classList.contains('key--operator'))
  operatorKeys
    .forEach(k => {
      k.classList.remove('is-depressed')
    })
}

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
  const { action } = key.dataset
  const keyContent = key.textContent
  const { previousKeyType, firstValue, operator, modifierVal } = state
  const keyType = getKeyType(key)

  if (keyType === "number") {
    return displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent //not addition but concatenation in strings
  }
  if (action === "decimal") {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.' //if a user directly hits the decimal after an operator, he'd mean 'zero point something'
    return displayedNum; //if none of above match, createResultString() should not return displayedNum instead of undefined
  }
  if (keyType === "operator") {
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

const getKeyType = (key) => {
  const { action } = key.dataset

  if (!action) return "number"
  if (action === "add" ||
    action === "multiply" ||
    action === "subtract" ||
    action === "divide"
  ) return "operator"
  return action //for others ie decimal, calculate, clear, they are already easy to read / consistent, so just return them
}
