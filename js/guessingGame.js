/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
const gameForm = document.querySelector('.gameForm');
console.log(gameForm)
const listOfPrevGuesses = document.querySelector('#previousGuesses');
const userInput = document.querySelector('#userInput');
const userFeedback = document.querySelector('h1');
const previousGuessList = document.querySelector('#previousGuesses').children;
const submitGuess = document.querySelector('#submitGuess');
const playAgain = document.querySelector('#playAgain');
const hint = document.querySelector('#hint')

function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array){
    let m = array.length;
    let t;
    let i;
    while(m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function newGame() {

    function handleSubmit(e) {
        e.preventDefault();
        game.playerGuess = e.target.userInput.value;
        let userInput = e.target.userInput.value;
        game.playersGuessSubmission(userInput);
        e.target.reset();
    }

    gameForm.addEventListener('submit', function(e){
        handleSubmit(e);
        game.difference();
    });

    hint.addEventListener('click', function() {
        let random1 = Math.floor(Math.random() * 100) +1;
        let random2 = Math.floor(Math.random() * 100) +1;
        let unshuffledArray = [random1, random2, game.winningNumber]
        let shuffledArray = shuffle(unshuffledArray);
        userFeedback.textContent = `the winning number is either: ${shuffledArray[0]}, ${shuffledArray[1]}, ${shuffledArray[2]}`
    })
    
    playAgain.addEventListener('click', function() {
        userFeedback.textContent = 'Guessing Game';
        for (let i = 0; i < previousGuessList.length; i++) {
            previousGuessList[i].textContent = '?';
        }
        submitGuess.disabled = false;
        hint.disabled = false;
        newGame();
    });

    let game = {
       pastGuesses: [],
       playersGuess: 0,
       winningNumber: generateWinningNumber(),
       difference: function() {
           let difference =  Math.abs(this.playersGuess - this.winningNumber);
           if (difference === 0) {
            userFeedback.textContent = 'YOU WIN!!';
            submitGuess.disabled = true;
            hint.disabled = true;
           }
           return difference;
       },
       isLower: function() {
            if (this.playersGuess < this.winningNumber) return true;
            else {
                return false;
            }
       },
       playersGuessSubmission: function(userInputs) {
            let numUserInputs = parseInt(userInputs);
            if (numUserInputs > 0 && numUserInputs <= 100) {
                this.playersGuess = numUserInputs
                let checkedGuess = this.checkGuess();
                return checkedGuess;
            } else  {
               return userFeedback.textContent = 'that is an invalid guess'
            }
       }, 
       checkGuess: function() {
               
               if (this.pastGuesses.includes(parseInt(this.playersGuess))) {
                   userFeedback.textContent = 'you already guessed that number';
                }
                if (this.pastGuesses.indexOf(parseInt(this.playersGuess)) === -1) {
                    this.pastGuesses.push(parseInt(this.playersGuess));
                    previousGuessList[this.pastGuesses.length -1].textContent = this.playersGuess;                
                if (this.difference() <= 10) userFeedback.textContent = `You're burning up!`;
                if (this.difference() > 10 && this.difference() < 25) userFeedback.textContent = `You're lukewarm`;
                if (this.difference() > 25 && this.difference() < 50) userFeedback.textContent = `You're a bit chilly`;
                if (this.difference() > 50 && this.difference() < 100) userFeedback.textContent = `You're ice cold`;
            } 
            if (this.pastGuesses.length === 5) {
                userFeedback.textContent = 'You Lose';
                submitGuess.disabled = true;
               }
        }
    }
    return game;
}   

newGame();
    
    