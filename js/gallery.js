//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

(function() {
    const pictures = [
        "pic-1",
        "pic-2", 
        "pic-3",
        "pic-4"
    ];
    
    const buttons = document.querySelectorAll('.btn')
    const imageDiv = document.querySelector('.img-container')
    let counter = 0
    
    buttons.forEach(function(button){
        button.addEventListener('click', function(){
            if (button.classList.contains('btn-left'))
            {
                counter--
                if (counter < 0)
                {
                    counter = pictures.length -1
                }
                imageDiv.style.backgroundImage = `url('./img/${pictures[counter]}.jpg')`
            }
            else if (button.classList.contains('btn-right'))
            {
                counter++
                if (counter > pictures.length -1)
                {
                    counter = 0
                }
                imageDiv.style.backgroundImage = `url('./img/${pictures[counter]}.jpg')`
            }
        })
    })
})();