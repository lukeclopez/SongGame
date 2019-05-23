var time, scores, activePlayer, gameRunning;
var timeEl, namesEl, scoresEl, guessWordEl, tabooWordsEl;
var words, usedWords;

scores = [0 , 0];

words = [
    {
        guessWord: "Solomon",
        tabooWords: [
            "King",
            "David",
            "Wisdom",
            "Wives"
        ]
    },
    {
        guessWord: "Jesus",
        tabooWords: [
            "God's Son",
            "King",
            "Teacher",
            "Firstborn"
        ]
    },
];

usedWords = [];

timeEl = document.getElementById("time");

namesEl = [
    document.getElementById('name-1'), 
    document.getElementById('name-2')
];

scoresEl = [
    document.getElementById('score-1'), 
    document.getElementById('score-2')
];

guessWordEl = document.getElementById('guess-word');

tabooWordsEl = document.querySelectorAll(".taboo-word")

initGame();
setInterval(update, 1000);

function initGame() {

    gameRunning = true;
    time = 60;
    activePlayer = 0;
    scores = [0, 0]
    
    timeEl.textContent = time;
    scoresEl[0].textContent = 0;
    scoresEl[1].textContent = 0;

    getNewWord();

}

function getNewWord() {

    newWord = selectWord();
    guessWordEl.textContent = newWord.guessWord;

    for(var i = 0; i < newWord.tabooWords.length; i++) {
        tabooWordsEl[i].textContent = newWord.tabooWords[i];
    }

}

function selectWord() {

    dice = Math.floor(Math.random() * words.length);
    selectedWord = words[dice];

    if (usedWords.length === words.length) {

        // Empty our used words list if we have no words left
        usedWords.length = 0;

    } else if (usedWords.includes(selectedWord)) {

        // Try again to get an unused word
        console.log("REPEAT WORD!");

    } else {
        
        // Add the word to the used words list
        usedWords.push(selectedWord);

    }

    return selectedWord;

}

function update() {

    if(gameRunning) {

        // Check if we are out of time
        if (time < 1) {

            // Switch Player
            if (activePlayer === 0) {
                activePlayer = 1;
            } else {
                activePlayer = 0;
            }

        } else {

            // Count down on the timer
            time--;
            timeEl.textContent = time;

        }

        // If game is paused or over, hide the words
    }
  }

document.getElementById('btn-got-it').addEventListener('click', function() {

    // Update score
    scores[activePlayer]++;
    scoresEl[activePlayer].textContent = scores[activePlayer];

    // Change the word
    getNewWord();

});

document.getElementById('btn-skip').addEventListener('click', function() {

    // Change the word
    getNewWord();

});;

document.getElementById('btn-new-game').addEventListener('click', function() {
    
    // Restart game
    if (confirm("Start a new game?")) {
        initGame();
    }

});;

var pauseBtn = document.getElementById('btn-pause')

pauseBtn.addEventListener('click', function() {
    if (gameRunning) {
        gameRunning = false;
        pauseBtn.innerHTML = "Play";
    } else {
        gameRunning = true;
        pauseBtn.innerHTML = "Pause";
    }
});;
