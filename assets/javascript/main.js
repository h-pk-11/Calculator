"use strict";

const calculator = document.querySelector('.calculator');

const screen = calculator.querySelector('.screen');

const keys = calculator.querySelector('.calculator_keys');

calculator.dataset.firstNumber = '';
calculator.dataset.operator = '';
calculator.dataset.secondNumber = '';


keys.addEventListener('click', event => {

    if (!event.target.closest('button')) { return; }
    const key = event.target;
    const keyValue = key.textContent;
    let screenValue = screen.textContent;

    // remove .selected in operator key
    const previousKey = calculator.querySelector(`[data-key='${calculator.dataset.operator}']`);
    if (previousKey) {
        previousKey.classList.remove('selected');
    }

    if (key.dataset.type === 'number') {
        
        if (key.dataset.key === 'decimal') {
            if(calculator.dataset.previousKeyType === 'equal'){
                screen.textContent += ("0" + keyValue);
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

    if (key.dataset.type === 'operator') {
        if(calculator.dataset.previousKeyType === 'number'){
            const secondNumber = screen.textContent;
            const firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let result = '';
            result = calculate(firstNumber, operator, secondNumber);
            screen.textContent = result;
        }
        key.classList.add('selected');
        calculator.dataset.operator = key.dataset.key;
        calculator.dataset.firstNumber = screen.textContent;
    }

    if (key.dataset.type === 'equal') {
        if(calculator.dataset.previousKeyType !== 'equal'){

            const secondNumber = screen.textContent;
            const firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let result = '';
            result = calculate(firstNumber, operator, secondNumber);
            screen.textContent = result;
        }
        
    }





    calculator.dataset.previousKeyType = key.dataset.type;
    calculator.dataset.previousKey = key.dataset.type;
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
        result = Number(firstNumber) * Number(secondNumber);
    }

    if (operator === "divide") {
        if (Number(secondNumber) === 0) {
            return "Error";
        } else {
            result = Number(firstNumber) / Number(secondNumber);
        }

    }

    return result;
}