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
      key.classList.add("is-depressed")
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

    //each time any key is pressed, all four operator buttons will have 'is-depressed' class removed
    const keys = Array.from(keysDiv.children)
    const operatorKeys = keys.filter(k => k.classList.contains('key--operator'))
    operatorKeys
      .forEach(k => {
        k.classList.remove('is-depressed')
      })
  }
})


