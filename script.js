// 1. Click clear button
// 2. Click number and period button
// 3. Click operator
// 4. Click equal sign
// 5. Click delete button

import Calculator from "./Calculator.js";

const primaryOperandDisplay = document.querySelector("[data-primary-operand]");
const secondaryOperandDisplay = document.querySelector(
  "[data-secondary-operand]"
);
const operationDisplay = document.querySelector("[data-operation]");

const calculator = new Calculator(
  primaryOperandDisplay,
  secondaryOperandDisplay,
  operationDisplay
);

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-all-clear]")) {
    calculator.clear();
  }
  if (event.target.matches("[data-delete]")) {
    calculator.removeDigit();
  }
  if (event.target.matches("[data-operation]")) {
    calculator.addOperation(event.target.textContent);
  }
  if (event.target.matches("[data-number]")) {
    calculator.addDigit(event.target.textContent);
  }
  if (event.target.matches("[data-equals]")) {
    calculator.evaluate();
  }
});
