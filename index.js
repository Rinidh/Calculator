const buttons = document.querySelectorAll("button")
const screen = document.getElementsByClassName("screen")[0]

buttons.forEach(button => {
  //actions for buttons having number inputs
  if (button.id && button.id !== "button-dot" && button.id !== "button-clear") {
    button.addEventListener("click", e => {
      screen.innerText += e.target.innerText;
    })
  }

  //actions for dot button
  if (button.id === "button-dot") {
    button.addEventListener("click", e => {
      if (!screen.innerText.includes(".")) {
        screen.innerText += e.target.innerText;
      }
    })
  }
})