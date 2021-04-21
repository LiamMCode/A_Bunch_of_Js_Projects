//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

(function() {
    const quotes = [
        {
            quote: "Just Keep Swimming", 
            author: "Finding Nemo (2003)"
        },
        {
            quote: "Why So Serious",
            author: "Joker, The Dark Knight (2008)"
        },
        {
            quote: "It means get lost Squidward",
            author: "Tony Stark, Avengers: End Game"
        },
        {
            quote: "May the Force be with you.",
            author: "Star Wars: A New Hope (1977)"
        },
        {
            quote: "Life is never completely without challenges",
            author: "Stan Lee"
        },
        {
            quote: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },
        {
            quote: "Success is not final; failure is not fatal: It is the courage to continue that counts.",
            author: "Winston Churchill"
        }
    ];
    
    const btn = document.getElementById("generate-btn");
    
    btn.addEventListener('click', function() {
        let random = Math.floor(Math.random() * quotes.length);        
        document.getElementById("quote").textContent = quotes[random].quote;
        document.querySelector(".author").textContent = quotes[random].author;
    });
})();