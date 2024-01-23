/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */

function add(number1 , number2){

  return number1 + number2
}


function addNumbers(){

    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);
    document.querySelector('#sum').value = add(addNumber1 , addNumber2);

}

//this one is not locate inside a function
document.querySelector('#addNumbers').addEventListener('click',addNumbers)

/* Function Expression - Subtract Numbers */

// Let define the subtract function
function subtract(a, b) {
    return a - b;
}

// JavaScript function declaration for subtractNumbers
function subtractNumbers() {
    // Get values of form controls and convert to numbers
    let subtractNumber1 = Number(document.getElementById("subtract1").value);
    let subtractNumber2 = Number(document.getElementById("subtract2").value);

    // Let Call the subtract function with the two arguments
    let result = subtract(subtractNumber1, subtractNumber2);

    //Let  Assign the return value to an HTML form element with an ID of "difference"
    document.getElementById("difference").value = result;

}


// Add a "click" event listener to the HTML button with an ID of "subtractNumbers"
document.getElementById("subtractNumbers").addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */

// Arrow function for multiplication
const multiply = (a, b) => a * b;

// Arrow function for multiplyNumbers
const multiplyNumbers = () => {
    // Get values of form controls and convert to numbers
    let factor1 = Number(document.getElementById("factor1").value);
    let factor2 = Number(document.getElementById("factor2").value);

    // Call the multiply arrow function with the two arguments
    let result = multiply(factor1, factor2);

    // Assign the return value to an HTML form element with an ID of "product"
    document.getElementById("product").value = result;
}

// Add a "click" event listener to the HTML button with an ID of "multiplyNumbers"
document.getElementById("multiplyNumbers").addEventListener('click', multiplyNumbers);

/* Open Function Use - Divide Numbers */

// Function declaration for division
function divide(a, b) {
    return a / b;
}

// Arrow function for divideNumbers
const divideNumbers = () => {
    // Get values of form controls and convert to numbers
    let dividend = Number(document.getElementById("dividend").value);
    let divisor = Number(document.getElementById("divisor").value);

    // Call the divide function with the two arguments
    let result = divide(dividend, divisor);

// Assign the return value to an HTML form element with an ID of "quotient"

    document.getElementById("quotient").value = result;

}



// Add a "click" event listener to the HTML button with an ID of "divideNumbers"
document.getElementById("divideNumbers").addEventListener('click', divideNumbers);
/* Decision Structure */



// Function to calculate the total due
// Add an event listener to the "Get Total Due" button
document.getElementById("getTotal").addEventListener('click', calculateTotal);
// Function to calculate the total due
function calculateTotal() {
    // Let Get the numeric value entered by the user in the subtotal field
    let subtotalValue = parseFloat(document.getElementById("subtotal").value);

    // Let Check if the membership checkbox has been checked
    let isMember = document.getElementById("member").checked;

    // Apply a 15% discount if the checkbox is checked
    if (isMember) {
        subtotalValue *= 0.85;
    }

    // Output the total to the total span in the specified format with two decimals using a template string
    document.getElementById("total").textContent = `$ ${subtotalValue.toFixed(2)}`;
}
/* ARRAY METHODS - Functional Programming */


// Declare and instantiate an array variable to hold the numbers 1 through 13
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];



/* Output Source Array */

// Assign the value of the array variable to the HTML element with an ID of "array"
document.getElementById("array").textContent = numbersArray;

/* Output Odds Only Array */

// Use the filter() array method to find all odd numbers and assign the result to the HTML element with an ID of "odds"
document.getElementById("odds").textContent = numbersArray.filter(number => number % 2 === 1);

/* Output Evens Only Array */


// Use the filter() array method to find all even numbers and assign the result to the HTML element with an ID of "evens"
document.getElementById("evens").textContent = numbersArray.filter(number => number % 2 === 0);

/* Output Sum of Org. Array */


// Use the reduce() array method to sum the array elements and assign the result to the HTML element with an ID of "sumOfArray"
document.getElementById("sumOfArray").textContent = numbersArray.reduce((sum, number) => sum + number);

/* Output Multiplied by 2 Array */


// Use the map() array method to multiply each element in the array by 2 and assign the result to the HTML element with an ID of "multiplied"
document.getElementById("multiplied").textContent = numbersArray.map(number => number * 2);

/* Output Sum of Multiplied by 2 Array */
// Use the map() and reduce() array methods to sum the array elements after multiplying each element by two.
// Assign the result to the HTML element with an ID of "sumOfMultiplied"
document.getElementById("sumOfMultiplied").textContent = numbersArray.map(number => number * 2).reduce((sum, number) => sum + number);

