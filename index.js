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
  const resultString = createResultString(key, displayedNum, calculator.dataset)
  display.textContent = resultString

  //Handling the impure part (changing other variables accordingly)
  updateCalculatorState(key, calculator, displayedNum, resultString)
})

const updateCalculatorState = (key, calculator, displayedNum, calculatedValue) => {
  const { firstValue, previousKeyType, modifierVal, operator } = calculator.dataset
  const keyType = getKeyType(key)
  calculator.dataset.previousKeyType = keyType //set previous keyType at one point instead of in each case below

  if (keyType === "operator") {
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculatedValue
      : displayedNum

    calculator.dataset.operator = key.dataset.action
  }
  if (keyType === 'clear') {
    if (key.textContent === 'AC') { //reset the stored data appropriately
      calculator.dataset.firstValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.modifierVal = '';
      calculator.dataset.previousKeyType = ''
    }
  }
  if (keyType === 'calculate') {
    calculator.dataset.modifierVal = (firstValue && previousKeyType === 'calculate')
      ? modifierVal
      : displayedNum
  }

  updateVisualState(key, calculator)
}

const createResultString = (key, displayedNum, state) => { //state param requires passing calculator.dataset, which is like holding the current state of the calculator
  const keyContent = key.textContent
  const { previousKeyType, firstValue, operator, modifierVal } = state
  const keyType = getKeyType(key)

  if (keyType === "number") {
    return displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent //not addition but concatenation in strings
  }
  if (keyType === "decimal") {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.' //if a user directly hits the decimal after an operator, he'd mean 'zero point something'
    return displayedNum; //if none of above match, createResultString() should not return displayedNum instead of undefined
  }
  if (keyType === "operator") {
    return (firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
    ) ? calculate(firstValue, operator, displayedNum)
      : displayedNum //in order not to return undefined if all conditions fail

  }
  if (keyType === "clear") {
    return 0;
  }
  if (keyType === "calculate") {
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

function calculate(firstNum, operation, secondNum) {
  const value1 = parseFloat(firstNum)
  const value2 = parseFloat(secondNum)

  //early return pattern (alternatively use switch case)
  if (operation === 'add') return value1 + value2
  if (operation === 'subtract') return value1 - value2
  if (operation === 'multiply') return value1 * value2
  if (operation === 'divide') return value1 / value2
}

function updateVisualState(key, calculator) {
  //each time any key is pressed, all four operator buttons will have 'is-depressed' class removed
  const keys = Array.from(key.parentNode.children) //easier not to use keysDiv (as we have to set it as param also) and rather access all keys from the single key in the param/argument
  const operatorKeys = keys.filter(k => k.classList.contains('key--operator'))
  operatorKeys
    .forEach(k => {
      k.classList.remove('is-depressed')
    })

  const keyType = getKeyType(key)

  if (keyType === 'operator') key.classList.add("is-depressed");
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if (keyType !== 'clear') { //if any button apart from 'clear', change AC to CE
    const clearButton = calculator.querySelector('[data-action=clear]') //better access the calculator as arg and access the clearButton from it. This makes updateVisualState() reusable in different projects
    clearButton.textContent = 'CE';
  }
}