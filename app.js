var time, scores, words, activePlayer, gameRunning;
var timeEl, namesEl, scoresEl, guessWordEl, tabooWordsEl;

scores = [0 , 0];

words = [
    {
        guessWord: "Solomon",
        tabooWords: [
            "King",
            "David",
            "Wisdom",
            "Peaceful"
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

function initGame() {
    gameRunning = true;
    time = 60;
    setInterval(timer, 1000);
    activePlayer = 0;
    scores = [0, 0]
    
    timeEl.textContent = time;
    scoresEl[0].textContent = 0;
    scoresEl[1].textContent = 0;

    // Start the clock

    // Choose a word
}

function selectWord() {
    dice = Math.floor(Math.random() * words.length);
    selectedWord = words[dice]
    console.log(dice)

    return selectedWord;
}

function timer() {
    if(gameRunning) {
      time--;
      timeEl.textContent = time;
    }
  }