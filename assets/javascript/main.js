"use strict";

const calculator = document.querySelector('.calculator');

const screen = calculator.querySelector('.screen');

const keys = calculator.querySelector('.calculator_keys');

calculator.dataset.firstNumber = '';
calculator.dataset.operator = '';
calculator.dataset.secondNumber = '';

function handleTheKey(key){

    const keyValue = key.textContent;
    let screenValue = screen.textContent;

    if (key.dataset.type === 'number') {
        
        if(key.dataset.key === "signs"){

            screen.textContent = `${(0 - Number(screenValue))}`;

        }else if(key.dataset.key === "percent"){

            screen.textContent = `${Number(screenValue)/100}`;

        }else if(key.dataset.key === "backSpace"){

            if(screen.textContent != '0'){

                screen.textContent = screenValue.slice(0,-1);
                if(screen.textContent === ''){
                    screen.textContent = '0';
                }
            }

        }else{

            if (key.dataset.key === 'decimal') {
                if(calculator.dataset.previousKeyType === 'equal'){

                    screen.textContent = ("0" + keyValue);
                }else{
                    if (!screenValue.includes('.')) {
                        screen.textContent += keyValue;
                    }
                }
                
            } else {
                if (screenValue === '0' 
                || calculator.dataset.previousKeyType === 'operator'
                || calculator.dataset.previousKeyType === 'equal') {
                    screen.textContent = keyValue;
                } else {
                    screen.textContent += keyValue;
                }
            }
    
        }
    }

    if (key.dataset.type === 'operator') {
        key.classList.add('selected');

        if(calculator.dataset.secondNumber === ''){
            calculator.dataset.secondNumber = screen.textContent;
        }else{
            calculator.dataset.firstNumber = calculator.dataset.secondNumber;
            calculator.dataset.secondNumber = screen.textContent;
        }
     
        if(calculator.dataset.firstNumber != ''
        && calculator.dataset.secondNumber != ''
        && calculator.dataset.operator != ''){
            const secondNumber = calculator.dataset.secondNumber;
            const firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let result = '';
            result = calculate(firstNumber, operator, secondNumber);
            screen.textContent = result;

            calculator.dataset.firstNumber = calculator.dataset.secondNumber;
            calculator.dataset.secondNumber = screen.textContent;
        }
        
        calculator.dataset.operator = key.dataset.key;
    }

    if (key.dataset.type === 'equal') {

        if(calculator.dataset.secondNumber === ''){
            calculator.dataset.secondNumber = screen.textContent;
        }else{
            calculator.dataset.firstNumber = calculator.dataset.secondNumber;
            calculator.dataset.secondNumber = screen.textContent;
        }

        if(calculator.dataset.previousKeyType !== 'equal'){

            const secondNumber = calculator.dataset.secondNumber;
            const firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let result = '';
            result = calculate(firstNumber, operator, secondNumber);
            screen.textContent = result;

            calculator.dataset.firstNumber = '';
            calculator.dataset.secondNumber = '';
        }
    }

    if(key.dataset.type === 'allClear'){
        calculator.dataset.firstNumber = '';
        calculator.dataset.secondNumber = '';
        calculator.dataset.operator = '';
        screen.textContent = '0';
    }

    calculator.dataset.previousKeyType = key.dataset.type;
}

keys.addEventListener('click', event => {

    if (!event.target.closest('button')) { return; }
    const key = event.target;
    const keyValue = key.textContent;
    let screenValue = screen.textContent;

    const previousKey = calculator.querySelector(`[data-key='${calculator.dataset.operator}']`);
    if (previousKey) {
        previousKey.classList.remove('selected');
    }

    handleTheKey(key);
});

function calculate(firstNumber, operator, secondNumber) {
    let result;
    if (operator === "plus") {
        result = Number(firstNumber) + Number(secondNumber);
    }

    if (operator === "minus") {
        result = Number(firstNumber) - Number(secondNumber);
    }

    if (operator === "times") {
        result = firstNumber * secondNumber;
    }

    if (operator === "divide") {
        if (Number(secondNumber) === 0) {
            return "Error";
        } else {
            result = Number(firstNumber) / Number(secondNumber);
        }
    }

    if(result.toString().includes('.')){
        return result.toFixed(2);
    }
    return result;
}

window.addEventListener('keydown', event => {

    const key = calculator.querySelector(`[data-key-code="${event.keyCode}"]`);
    if(key){

        const previousKey = calculator.querySelector(`[data-key='${calculator.dataset.operator}']`);
        if (previousKey) {
            previousKey.classList.remove('selected');
        }

        if(key.dataset.type === 'operator'){
            key.classList.add('selected');
        }else if(key.dataset.type === 'number'){
            if(key.dataset.key === 'percent'
            || key.dataset.key === 'backSpace'
            || key.dataset.key === 'signs'){
                key.classList.add('selected_');
            }else{
                key.classList.add('selected');
            }
        }else if(key.dataset.type === 'equal'){
            key.classList.add('selected');
        }else if(key.dataset.key === 'allClear'){
            key.classList.add('selected__');
        }

        handleTheKey(key);
    }
});

window.addEventListener('keyup', event => {

    const key = calculator.querySelector(`[data-key-code="${event.keyCode}"]`);
    if(key){

        if(key.dataset.type === 'number'){
            
            if(key.dataset.key === 'percent'
            || key.dataset.key === 'backSpace'
            || key.dataset.key === 'signs'){
                key.classList.remove('selected_');
            }else{
                key.classList.remove('selected');
            }

        }else if(key.dataset.type === 'equal'){
            key.classList.remove('selected');
        }else if(key.dataset.key === 'allClear'){
            key.classList.remove('selected__');
        }
    }
});