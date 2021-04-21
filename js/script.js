//choosing a random colour

//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

const button = document.querySelector('button')
const body = document.querySelector('body')
const colours = ['red', 'pink', 'blue', 'yellow', 'red', 'green', 'white', 'purple']

body.style.backgroundColor = 'voilet'
button.addEventListener('click', changeBackground)

function changeBackground(){
    const colourIndex = parseInt(Math.random()*colours.length)
    body.style.backgroundColor = colours[colourIndex]
}