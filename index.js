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

    if (!action) {
      if (displayedNum === '0') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent //not addition but concatenation in strings
      }
    }
    if (action === "add" || action === "multiply" || action === "subtract" || action === "divide") {
      console.log("an operator")
    }
    if (action === "decimal") {
      display.textContent = displayedNum + '.'
    }
    if (action === 'clear') {
      console.log('ac button');

    }
    if (action === 'calculate') {
      console.log('equals button');

    }
  }
})


