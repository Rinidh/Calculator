const buttons = document.querySelectorAll("button")
const screen = document.getElementsByClassName("screen")[0]

buttons.forEach(button => {
  if (button.id && button.id !== "button-dot" && button.id !== "button-clear") {
    button.addEventListener("click", e => {
      screen.innerText = e.target.innerText;
    })
  }
})