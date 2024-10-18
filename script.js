const words = [
    "javascript", "html", "css", "programming", "code", "function", "variable", 
    "object", "array", "loop", "conditional", "syntax", "compile", "debug", 
    "algorithm", "recursion", "framework", "library", "react", "node", "database", 
    "server", "frontend", "backend", "fullstack", "json", "ajax", "typescript", 
    "module", "event", "listener", "async", "await", "promise", "closure", 
    "hoisting", "scope", "prototype", "inheritance", "class", "constructor", 
    "super", "this", "method", "instance", "encapsulation", "polymorphism", 
    "refactor", "git", "repository", "commit", "merge", "branch", "deploy", 
    "api", "rest", "graphql", "callback"
  ];
  
let currentWord, playerName, highestScore = 0, score = 0;
let timerInterval;

const nameModal = document.getElementById("nameModal");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameInput = document.getElementById("playerName");
const gameContainer = document.getElementById("gameContainer");
const scrambledWordDisplay = document.getElementById("scrambledWord");
const userInput = document.getElementById("userInput");
const submitGuess = document.getElementById("submitGuess");
const messageDisplay = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const playerInfoDisplay = document.getElementById("playerInfo");
const highestScoreDisplay = document.getElementById("highestScore");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const backBtn = document.getElementById("backBtn");

function shuffleWord(word) {
    const shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
    return shuffled;
}

function startGame() {
    playerName = playerNameInput.value;
    nameModal.style.display = "none";
    gameContainer.style.display = "block";
    playerInfoDisplay.textContent = `Player: ${playerName}`;
    resetGame();
    startTimer();
}

function resetGame() {
    score = 0;
    generateNewWord();
    messageDisplay.textContent = '';
    clearInterval(timerInterval); 
    startTimer();
}

function generateNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWordDisplay.textContent = shuffleWord(currentWord);
    userInput.value = '';
    messageDisplay.textContent = '';
}

function checkGuess() {
    if (userInput.value.toLowerCase() === currentWord) {
        score++;
        highestScore = Math.max(highestScore, score);
        highestScoreDisplay.textContent = highestScore;
        messageDisplay.textContent = "Correct! Next word...";
        generateNewWord();
    } else {
        messageDisplay.textContent = "Wrong! Try again.";
    }
}

function startTimer() {
    let timeLeft = 30; // 30 seconds
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game over! Your score: ${score}`);
    resetGame();
}

function goBackToModal() {
    clearInterval(timerInterval); 
    gameContainer.style.display = "none";
    nameModal.style.display = "flex";
    playerNameInput.value = '';
    playerName = '';
    userInput.value = '';
    messageDisplay.textContent = '';
    timerDisplay.textContent = '';
}

playerNameInput.addEventListener('input', () => {
    startGameBtn.disabled = playerNameInput.value.trim() === '';
});

startGameBtn.addEventListener('click', startGame);
submitGuess.addEventListener('click', checkGuess);
tryAgainBtn.addEventListener('click', resetGame);
backBtn.addEventListener('click', goBackToModal);
