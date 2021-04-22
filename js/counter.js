//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

(function() {
    const buttons = document.querySelectorAll('.counterBtn')
    let count = 0
    
    //adding event listeners to each button
    buttons.forEach(function(button){
        button.addEventListener('click', function(){
            if (button.classList.contains('prevBtn'))
            {
                count--        
            }
            else if (button.classList.contains('nextBtn'))
            {
                count++        
            }
            
            const counter = document.querySelector('#counter')
            counter.textContent = count
            
            if (count < 0)
            {
                counter.style.color = 'red'
            }
            else if (count > 0)
            {
                counter.style.color = 'green'    
            }
            else
            {
                counter.style.color = '#333333'    
            }
        })
    })
}