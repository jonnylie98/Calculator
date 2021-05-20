export default class Calculator {
  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay;
    this.#secondaryOperandDisplay = secondaryOperandDisplay;
    this.#operationDisplay = operationDisplay;
    this.clear();
  }

  #primaryOperandDisplay;
  #secondaryOperandDisplay;
  #operationDisplay;

  get primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value);
  }

  set primaryOperand(value) {
    this.#primaryOperandDisplay.dataset.value = value ?? "";
    this.#primaryOperandDisplay.textContent = displayNumber(value);
  }

  get secondaryOperand() {
    return this.#secondaryOperandDisplay.textContent;
  }

  set secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value ?? "";
    this.#secondaryOperandDisplay.textContent = displayNumber(value);
  }

  get operation() {
    return this.#operationDisplay.textContent;
  }

  set operation(value) {
    this.#operationDisplay.textContent = value ?? "";
  }

  clear() {
    this.primaryOperand = 0;
    this.secondaryOperand = null;
    this.operation = null;
  }

  addDigit(value) {
    if (
      value === "." &&
      this.#primaryOperandDisplay.dataset.value.includes(".")
    )
      return;

    if (this.primaryOperand === 0) {
      this.primaryOperand = value;
      return;
    }
    this.primaryOperand = this.#primaryOperandDisplay.dataset.value + value;
  }

  removeDigit() {
    const numberString = this.#primaryOperandDisplay.dataset.value;
    if (numberString.length <= 1) {
      this.primaryOperand = 0;
      return;
    }
    this.primaryOperand = numberString.substring(0, numberString.length - 1);
  }

  addOperation(value) {
    if (this.operation != "") return;
    this.operation = value;
    this.secondaryOperand = this.primaryOperand;
    this.primaryOperand = 0;
  }

  evaluate() {
    let result;
    switch (this.operation) {
      case "*":
        result = this.secondaryOperand * this.primaryOperand;
        break;
      case "+":
        result = this.secondaryOperand + this.primaryOperand;
        break;
      case "-":
        result = this.secondaryOperand - this.primaryOperand;
        break;
      case "÷":
        result = this.secondaryOperand / this.primaryOperand;
        break;
      default:
        return;
    }
    this.clear();
    this.primaryOperand = result;

    return result;
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en");

function displayNumber(number) {
  const stringNumber = number?.toString() || "";
  if (stringNumber === "") return "";
  const [integer, decimal] = stringNumber.split(".");
  const formattedInteger = NUMBER_FORMATTER.format(integer);
  if (decimal == null) return formattedInteger;
  return formattedInteger + "." + decimal;
}
