let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;
let waitingForOperand = false;



function inputNumber(num) {
    if (waitingForOperand) {
        currentInput = num;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector(`[data-operator="${nextOperator}"]`).classList.add('active');

    if (previousInput === null) {
        previousInput = inputValue;
    } else if (operator) {
        const currentValue = previousInput || 0;
        const newValue = performCalculation();

        currentInput = String(newValue);
        previousInput = newValue;
        updateDisplay();
    }

    waitingForOperand = true;
    operator = nextOperator;
}

function performCalculation() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return current;

    switch (operator) {
        case '+':
            return prev + current;
        case '-':
            return prev - current;
        case '*':
            return prev * current;
        case '/':
            if (current === 0) {
                alert('Error: Division by zero!');
                return prev;
            }
            return prev / current;
        default:
            return current;
    }
}

function calculate() {
    const inputValue = parseFloat(currentInput);

    if (previousInput !== null && operator && !waitingForOperand) {
        const newValue = performCalculation();
        currentInput = String(newValue);
        previousInput = null;
        operator = null;
        waitingForOperand = true;

        document.querySelectorAll('.operator').forEach(btn => {
            btn.classList.remove('active');
        });

        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    waitingForOperand = false;

    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });

    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        inputNumber(key);
    }

    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        inputOperator(key);
    }

    else if (key === '.' || key === ',') {
        inputDecimal();
    }

    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }


    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }

    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

updateDisplay();
