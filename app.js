var scores, words, activePlayer, gameRunning;
var namesEl, scoresEl, guessWordEl, tabooWordsEl;

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
    activePlayer = 0;

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

