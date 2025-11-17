let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if(previousOperator === null) return;
            flushOperation(parseFloat(buffer.replace(",", ".")));
            previousOperator = null;
            buffer = String(runningTotal).replace(".", ",");
            runningTotal = 0;
            break;

        case '⌫':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '%':
            buffer = String(parseFloat(buffer) / 100);
            break;
            
        case 'x²':
            buffer = String(Math.pow(parseFloat(buffer), 2));
            break;
            
        case 'CE':
            buffer = "0";
            break;
        
        case '1/x':
            if (buffer === '0') {
                buffer = "Error";
                return;
            }
            buffer = (1 / parseFloat(buffer)).toString();
            break;
            
                
            

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        
            case ',':
                handleNumber(',');
                break;
    }
}

function handleMath(symbol){
    if (buffer === "0") {
        // menangani operator berurutan
        previousOperator = symbol;
        return;
    }

    const current = parseFloat(buffer.replace(",", "."));

    if(runningTotal === 0){
        runningTotal = current;
    } else {
        flushOperation(current);
    }

    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(value){
    if(previousOperator === '+'){
        runningTotal += value;
    } else if(previousOperator === '−'){
        runningTotal -= value;
    } else if(previousOperator === '×'){
        runningTotal *= value;
    } else if(previousOperator === '÷'){
        runningTotal /= value;
    }
}

function handleNumber(value){
    if (value === ",") {
        if (!buffer.includes(",")) { buffer += ","; }
        return;
    }

    if(buffer === '0'){
        buffer = value;
    }else{
        buffer += value;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
