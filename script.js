let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null; // Também limpe o operador anterior
            break;

        case '=':
            if (previousOperator === null) {
                // Apenas saia se não houver operação anterior
                return;
            }
            flushOperation(parseFloat(buffer)); // Use parseFloat aqui
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;

        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '+/-':
            buffer = (parseFloat(buffer) * -1).toString();
            break;

        case '%':
            buffer = (parseFloat(buffer) / 100).toString();
            break;

        case '.':
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        // Se o buffer estiver '0', não faça nada
        return;
    }

    const floatBuffer = parseFloat(buffer); // Troque para parseFloat

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer); // Use valores float aqui também
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        });
    });
}

init();