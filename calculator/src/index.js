let currentInput = '';
let firstOperand = null;
let operator = null;
let resultDisplayed = false;

const display = document.getElementById('display');

const buttons = document.querySelectorAll('.new, .oprator');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButton(button.id);
    });
});

function handleButton(value) {
    if (value >= '0' && value <= '9') {
        if (resultDisplayed) {
            clearDisplay();
            resultDisplayed = false;
        }
        currentInput += value;
        updateDisplay();
    } else if (value === 'C') {
        clearAll();
    } else if ('+-*/'.includes(value)) {
        if (operator !== null) {
            performCalculation();
        }
        operator = value;
        firstOperand = currentInput;
        clearDisplay();
    } else if (value === 'Enter') {
        performCalculation();
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    updateDisplay();
}

function performCalculation() {
    if (firstOperand === null || operator === null) {
        return;
    }
    const secondOperand = currentInput;
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    let result = 0;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b !== 0) {
                result = a / b;
            } else {
                result = 'Error';
            }
            break;
    }

    clearDisplay();
    display.textContent = result;
    resultDisplayed = true;
    currentInput = result.toString();
    operator = null;
    firstOperand = null;
}
