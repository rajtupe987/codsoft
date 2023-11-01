
const display = document.getElementById('display');




function AppendToDisplay(value){
    document.querySelector("#display").textContent+=value
}

function calculate() {
 
    const expression=document.querySelector("#display").textContent;

    try {
        const result=eval(expression);
        document.querySelector("#display").textContent=result;
    } catch (error) {
        document.querySelector("#display").textContent="Error"
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

function clearDisplay() {
    document.querySelector("#display").textContent=""
}

function clearAll() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    updateDisplay();
}

