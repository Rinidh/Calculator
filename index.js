const calculator = document.querySelector(".calculator")
const keysDiv = document.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')

keysDiv.addEventListener("click", e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action

    //when the button was a digit
    if (!action) {
      console.log("a number");
    }
    //when the button was +, -, * or /
    if (action === "add" || action === "multiply" || action === "subtract" || action === "divide") {
      console.log("an operator")
    }
    if (action === "decimal") {
      console.log('a decimal');
    }
    if (action === 'clear') {
      console.log('ac button');

    }
    if (action === 'calculate') {
      console.log('equals button');

    }
  }
})


