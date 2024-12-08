document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("calculatorDisplay");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "";
    let operator = null;
    let previousValue = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.innerText;

            if (button.classList.contains("number") || value === ".") {
                // Append number or decimal point to the current input
                if (value === "." && currentInput.includes(".")) return;
                currentInput += value;
                updateDisplay(currentInput);
            } else if (button.classList.contains("operator")) {
                // Store the operator and the current input
                operator = value;
                previousValue = currentInput;
                currentInput = "";
            } else if (value === "=") {
                // Perform calculation
                if (previousValue && currentInput && operator) {
                    const result = calculate(Number(previousValue), Number(currentInput), operator);
                    updateDisplay(result);
                    resetCalculator(result);
                }
            } else if (value === "C") {
                // Clear the display
                resetCalculator();
            }
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b === 0 ? "Error" : a / b;
            default:
                return 0;
        }
    }

    function updateDisplay(value) {
        display.value = value;
    }

    function resetCalculator(result = "") {
        currentInput = result.toString();
        previousValue = "";
        operator = null;
        updateDisplay(currentInput);
    }
});
