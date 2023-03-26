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
        
        if(key.dataset.key === "signs"){

            screen.textContent = `${(0 - Number(screenValue))}`;

        }else if(key.dataset.key === "percent"){

            screen.textContent = `${Number(screenValue)/100}`;

        }else if(key.dataset.key === "delete"){

            if(screen.textContent != '0'){

                screen.textContent = screenValue.slice(0,-1);
                if(screen.textContent === ''){
                    screen.textContent = '0';
                }

            }

        }else{

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