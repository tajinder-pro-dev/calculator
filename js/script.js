const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelector('.buttons').addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        if (action) {
            if (action === 'clear') clearDisplay();
            else if (action === '=') calculate();
            else appendOperator(action);
        } else {  appendNumber(value); }
    }
});

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(op) {
    if (currentInput === '') return;
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    display.value = `${previousInput} ${operator}`;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
}

function calculate() {
    if (!previousInput || !currentInput) return;

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'Error'; break;
        default: return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    display.value = currentInput;
}
