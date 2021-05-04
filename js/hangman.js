//used to fix Js errors to do with const and document not defined
/*eslint-env es6*/
/*eslint-env browser*/

let game1
const puzzleDIV = document.querySelector('#puzzle');
const remainingDIV = document.querySelector('#guesses');

window.addEventListener('keypress', (e) => {

    const guess = String.fromCharCode(e.charCode);
    game1.makeGuess(guess);
    render()
})

const render = () => {
    puzzleDIV.innerHTML = ''
    remainingDIV.textContent = game1.statusMessage;

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleDIV.appendChild(letterEl)
    })
}

const getPuzzle = async (wordCount) => {
    const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
        if (response.status === 200)
        {
            const data = await response.json()
            return data.puzzle
        } 
        else 
        {
            throw new Error('Unable to fetch puzzle')
        }
}

const startGame = async () => {
    const puzzle = await getPuzzle('3')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()

class Hangman 
{
    constructor(word, remainingGuesses)
    {
        this.word = word.toLowerCase().split('');
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = [];
        this.status = 'playing';
    }

    get puzzle() 
    {
        let puzzle = '';
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ')
            {
                puzzle += letter;
            } 
            else 
            {
                puzzle += '*'
            }
            })
        return puzzle;
    }

    makeGuess (guess)
    {
        guess = guess.toLowerCase();
        const isUnique = !this.guessedLetters.includes(guess);
        const isBadGuess = !this.word.includes(guess);
        
    if (this.status !== 'playing')
    {
        return
    }
    
        if (isUnique)
        {
            this.guessedLetters.push(guess)
        }
            
        if (isUnique && isBadGuess)
        {
            this.remainingGuesses--
        }
        this.calculateStatus();
    }

    get statusMessage()
    {
        if (this.status === 'playing')
        {
            return `Guesses left: ${this.remainingGuesses}`
        } 
        else if (this.status === 'failed') 
        {
            return `Nice try! The word was "${this.word.join('')}" `
        } 
        else 
        {
            return 'Great work! You guessed the word!'
        }
    }

    calculateStatus()
    {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        
        if (this.remainingGuesses === 0)
        {
            this.status = 'failed'
        } 
        else if (finished)
        {
            this.status = 'finished'
        } 
        else 
        {
            this.status = 'playing'
        }
    }

}