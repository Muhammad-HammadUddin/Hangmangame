const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const guessesText = document.querySelector(".guesses-text b");
const playAgainButton = document.querySelector(".play-again");



let currentWord, wrongGuessCount = 0;
let maxguesses = 6;
let correctLetters = [];

const resetGame = () => {
    wrongGuessCount = 0;
    correctLetters = [];
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

    // Clear previous word display content
    wordDisplay.innerHTML = "";
    // Display new word with empty placeholders
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    
    gameModal.classList.remove("show");
    guessesText.innerText = `${wrongGuessCount}/${maxguesses}`;
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = function(isVictory) {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was`;
        gameModal.classList.add("show");
        gameModal.querySelector("img").src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    }, 300);
};

const initGame = function(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === clickedLetter) {
                correctLetters.push(currentWord[i]);
                wordDisplay.querySelectorAll('li')[i].innerText = currentWord[i];
                wordDisplay.querySelectorAll('li')[i].classList.add("guessed");
            }
        }
    } else {
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    }
    
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount}/${maxguesses}`;

    if (wrongGuessCount === maxguesses) {
        return gameOver(false);
    } else if (currentWord.length === correctLetters.length) {
        return gameOver(true);
    }
};

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', function(e) {
        initGame(e.target, e.target.innerHTML);
    });
}

getRandomWord();
playAgainButton.addEventListener('click', getRandomWord);
