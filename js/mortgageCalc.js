//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

function computeLoan()
{
    const amount = document.querySelector('#amount').value;
    const interest_rate = document.querySelector('#interest_rate').value;
    const months = document.querySelector('#months').value;
    const interest = (amount * (interest_rate * 0.01)) / months;
    let payment = ((amount / months) + interest).toFixed(2); //calculate monthly payment

    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //\B looks for a word boundary, ? says what to look for, \d looks for 3 digits in a row
    document.querySelector('#payment').innerHTML = `Monthly Payment = ${payment}` 
    
}