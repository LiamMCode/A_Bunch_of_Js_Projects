//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

// function for category search (using the buttons)
(function () {
    const buttons = document.querySelectorAll('.btn')
    const shopItems = document.querySelectorAll('.store-item')
    
    buttons.forEach((button)=> {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const filter = e.target.dataset.filter
            
            shopItems.forEach((item)=> {
                if (filter === 'all')
                {
                    item.style.display ='block'        
                }
                else
                {
                    if (item.classList.contains(filter))
                    {
                        item.style.display = 'block'   
                    }
                    else 
                    {
                        item.style.display = 'none'   
                    }    
                }
            })
        })
    })
})();

//function for product search
(function () {
    const searchBox = document.querySelector('#search-item')
    const shopItems = document.querySelectorAll('.store-item')
    
    searchBox.addEventListener('keyup', (e) => {
        const searchFilter = e.target.value.toLowerCase().trim()
        
        shopItems.forEach((item) => {
            if (item.textContent.includes(searchFilter))
            {
                item.style.display = 'block'
            }
            else
            {
                item.style.display = 'none'
            }
        })
    })
})();
