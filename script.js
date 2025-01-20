let randomNum = parseInt(Math.random() * 100 + 1);
// console.log(randomNum);
// setInterval(function () {
//   const randomNum = parseInt(Math.random() * 100 + 1);
//   console.log(randomNum);
// }, 1000);
const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const PreviousGuesses = document.querySelector('.guesses');
const guessesRemaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let Previous_Guesses = []; 
let numGuess = 1; // Number of guesses

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();

    let guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // to check given input will Number or not / not less than 1 / not more than 100.
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a valid number which is more than 1');
  } else if (guess > 100) {
    alert('Please enter a valid number which is less than 100');
  } else {
    Previous_Guesses.push(guess);
    if (numGuess > 10) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNum}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // to check the guess value is correct/Low/High or equal to random number.
  if (guess === randomNum) {
    displayMessage('Congratulation!!! You guessed it right...');
    endGame();
  } else if (guess < randomNum) {
    displayMessage('Guessed number is too low.');
  } else if (guess > randomNum) {
    displayMessage('Guessed number is too High.');
  } else {
    displayMessage('Better Luck!!!Next Time...');
  }
}

function displayGuess(guess) {
  // clean the input values / display & update the previous guess and guess remaining.
  userInput.value = '';
  PreviousGuesses.innerHTML += `${guess},  `;
  numGuess++;
  guessesRemaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  // will pass msg to lowOrHi & Display the msg as it is.
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  // end the game.
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = '<h2 id="newGame">Start New Game</h2>';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  // start the new game.
  let newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    let randomNum = parseInt(Math.random() * 100 + 1);
    Previous_Guesses = [];
    numGuess = 1;
    PreviousGuesses.innerHTML = '';
    guessesRemaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}